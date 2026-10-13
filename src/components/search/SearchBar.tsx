"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Wrench, Loader2, LocateFixed, X, Phone, MessageCircle, ArrowRight } from "lucide-react"
import { toast } from "sonner"
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

interface NearestLocksmith {
  id: string
  companyName: string
  slug: string
  phone: string
  whatsapp: string
  rating: number
  reviewCount: number
  emergencyAvailable: boolean
  distanceKm: number
  etaMinutes: number
}

interface LocateResult {
  location: { name: string; slug: string; type: string }
  distanceKm: number
  inMarrakechArea: boolean
  locksmiths: NearestLocksmith[]
}

export function SearchBar({ locale = "fr", placeholder }: { locale?: string; placeholder?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [locate, setLocate] = useState<LocateResult | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
        setLocate(null)
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
    router.push(`/${locale}/marrakech/${result.slug}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${locale}/marrakech?q=${encodeURIComponent(query)}`)
    }
  }

  function rememberLocation(result: LocateResult) {
    try {
      localStorage.setItem("sm_last_district", JSON.stringify({ slug: result.location.slug, name: result.location.name, at: Date.now() }))
      window.dispatchEvent(new Event("sm-district-change"))
    } catch {}
  }

  async function handleLocate() {
    if (locating) return
    if (!("geolocation" in navigator)) {
      toast.error(locale === "ar" ? "الموقع الجغرافي غير مدعوم في متصفحك" : locale === "en" ? "Geolocation is not supported by your browser" : "La géolocalisation n'est pas supportée par votre navigateur")
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(`/api/nearest-location?lat=${latitude}&lng=${longitude}&locale=${locale}`)
          if (!res.ok) throw new Error("bad response")
          const data = await res.json()
          if (data.found) {
            rememberLocation(data)
            setLocate(data)
            if (!data.inMarrakechArea) {
              toast.info(
                locale === "ar"
                  ? `أنت على بعد ${data.distanceKm} كم من مراكش - تم اقتراح أقرب حي`
                  : locale === "en"
                  ? `You are ${data.distanceKm} km from Marrakech - nearest district suggested`
                  : `Vous êtes à ${data.distanceKm} km de Marrakech - quartier le plus proche proposé`
              )
            }
          } else {
            toast.error(locale === "ar" ? "لم يتم العثور على حي قريب" : locale === "en" ? "No nearby district found" : "Aucun quartier proche trouvé")
          }
        } catch {
          toast.error(locale === "ar" ? "تعذر تحديد موقعك" : locale === "en" ? "Unable to determine your location" : "Impossible de déterminer votre position")
        } finally {
          setLocating(false)
        }
      },
      (err) => {
        setLocating(false)
        const message =
          err.code === err.PERMISSION_DENIED
            ? locale === "ar"
              ? "تم رفض الإذن بالموقع"
              : locale === "en"
              ? "Location permission denied"
              : "Autorisation de localisation refusée"
            : err.code === err.POSITION_UNAVAILABLE
            ? locale === "ar"
              ? "الموقع غير متاح حالياً"
              : locale === "en"
              ? "Location is currently unavailable"
              : "Position actuellement indisponible"
            : locale === "ar"
            ? "انتهت مهلة تحديد الموقع"
            : locale === "en"
            ? "Location request timed out"
            : "Délai de localisation dépassé"
        toast.error(message)
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }

  function whatsappMessage(district: string) {
    return encodeURIComponent(
      locale === "ar"
        ? `مرحباً، أحتاج سراجاً في ${district}. هل يمكنكم التدخل؟`
        : locale === "en"
        ? `Hello, I need a locksmith in ${district}. Can you come?`
        : `Bonjour, j'ai besoin d'un serrurier à ${district}. Pouvez-vous intervenir ?`
    )
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
            placeholder={placeholder || (locale === "ar" ? "ابحث عن حي، خدمة..." : locale === "en" ? "Search a district, a service..." : "Recherchez un quartier, un service...")}
            className="pl-10 h-12 text-base"
          />
        </div>
        <Button type="submit" size="lg" className="h-12">
          {locale === "ar" ? "بحث" : locale === "en" ? "Search" : "Rechercher"}
        </Button>
        <Button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          size="lg"
          variant="outline"
          className={cn("h-12 gap-2", locate && "text-primary border-primary/50")}
          title={locale === "ar" ? "تحديد موقعي تلقائياً" : locale === "en" ? "Detect my location automatically" : "Détecter ma position automatiquement"}
        >
          {locating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LocateFixed className="h-5 w-5" />
          )}
          <span className="hidden md:inline">{locale === "ar" ? "موقعي" : locale === "en" ? "Near me" : "Près de moi"}</span>
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
            <p className="p-4 text-sm text-muted-foreground text-center">{locale === "ar" ? "لا توجد نتائج" : locale === "en" ? "No results found" : "Aucun résultat trouvé"}</p>
          )}
        </div>
      )}

      {locate && !isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-b">
            <p className="text-sm font-medium flex items-center gap-2">
              <LocateFixed className="h-4 w-4 text-primary" />
              {locale === "ar"
                ? `أنت بالقرب من ${locate.location.name}`
                : locale === "en"
                ? `You are near ${locate.location.name}`
                : `Vous êtes près de ${locate.location.name}`}
            </p>
            <button onClick={() => setLocate(null)} className="text-muted-foreground hover:text-foreground p-1" aria-label="close">
              <X className="h-4 w-4" />
            </button>
          </div>

          {locate.locksmiths.length > 0 && (
            <ul className="divide-y">
              {locate.locksmiths.map((l) => (
                <li key={l.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{l.companyName}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" /> {l.distanceKm} km
                      <span>·</span>
                      {locale === "ar" ? "وصول ~" : locale === "en" ? "ETA ~" : "Arrivée ~"}{l.etaMinutes} {locale === "ar" ? "دقيقة" : locale === "en" ? "min" : "min"}
                      {l.rating > 0 && <span>· ⭐ {l.rating.toFixed(1)}</span>}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a href={`tel:${l.phone}`}>
                      <Button size="sm" variant="emergency" className="gap-1.5 h-9">
                        <Phone className="h-4 w-4" />
                        <span className="hidden sm:inline">{locale === "ar" ? "اتصال" : locale === "en" ? "Call" : "Appeler"}</span>
                      </Button>
                    </a>
                    <a href={`https://wa.me/${l.whatsapp}?text=${whatsappMessage(locate.location.name)}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="whatsapp" className="gap-1.5 h-9 px-3">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <LinkDistrict locale={locale} slug={locate.location.slug} name={locate.location.name} />
        </div>
      )}
    </div>
  )
}

function LinkDistrict({ locale, slug, name }: { locale: string; slug: string; name: string }) {
  const router = useRouter()
  return (
    <div className="px-4 py-3 bg-muted/30 border-t">
      <Button
        variant="link"
        className="gap-1.5 h-auto p-0 text-primary"
        onClick={() => router.push(`/${locale}/marrakech/${slug}`)}
      >
        {locale === "ar"
          ? `عرض حي ${name}`
          : locale === "en"
          ? `View ${name} district`
          : `Voir le quartier ${name}`}
        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>
  )
}
