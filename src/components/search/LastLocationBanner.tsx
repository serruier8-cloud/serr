"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { MapPin, X, ArrowRight } from "lucide-react"

interface SavedDistrict {
  slug: string
  name: string
  at: number
}

const KEY = "sm_last_district"
const EVENT = "sm-district-change"

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener("storage", cb)
    window.removeEventListener(EVENT, cb)
  }
}

function getSnapshot(): SavedDistrict | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SavedDistrict
    if (data.slug && data.name && Date.now() - data.at < 7 * 24 * 3600 * 1000) {
      return data
    }
  } catch {}
  return null
}

export function LastLocationBanner({ locale = "fr" }: { locale?: string }) {
  const district = useSyncExternalStore(subscribe, getSnapshot, () => null)

  if (!district) return null

  function dismiss() {
    try {
      localStorage.removeItem(KEY)
      window.dispatchEvent(new Event(EVENT))
    } catch {}
  }

  return (
    <div className="container">
      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate">
            {locale === "ar"
              ? `حيّك المعتاد: ${district.name}`
              : locale === "en"
              ? `Your usual district: ${district.name}`
              : `Votre quartier habituel : ${district.name}`}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/${locale}/marrakech/${district.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            {locale === "ar" ? "فتح" : locale === "en" ? "Open" : "Ouvrir"}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
          <button onClick={dismiss} className="text-muted-foreground hover:text-foreground p-1" aria-label="close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
