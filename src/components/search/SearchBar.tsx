"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Wrench, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  name: string
  slug: string
  type: "location" | "service"
  subtype?: string
}

export function SearchBar({ locale = "fr", placeholder }: { locale?: string; placeholder?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}`)
      const data = await res.json()
      setResults(data.results || [])
      setIsOpen(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [locale])

  function handleSelect(result: SearchResult) {
    setIsOpen(false)
    setQuery("")
    if (result.type === "location") {
      router.push(`/${locale === "fr" ? "" : locale}/marrakech/${result.slug}`)
    } else {
      router.push(`/${locale === "fr" ? "" : locale}/marrakech/${result.slug}`)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${locale === "fr" ? "" : locale}/marrakech?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              search(e.target.value)
            }}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder={placeholder || "Recherchez un quartier, un service..."}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button type="submit" size="lg" className="h-12">
          Rechercher
        </Button>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={`${result.type}-${result.id}`}>
                  <button
                    onClick={() => handleSelect(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left"
                  >
                    {result.type === "location" ? (
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                    ) : (
                      <Wrench className="h-5 w-5 text-primary shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{result.name}</p>
                      {result.subtype && (
                        <p className="text-xs text-muted-foreground">{result.subtype}</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-sm text-muted-foreground text-center">Aucun résultat trouvé</p>
          )}
        </div>
      )}
    </div>
  )
}
