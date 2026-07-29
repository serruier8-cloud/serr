"use client"

import { useEffect, useRef } from "react"
import type { Map as LeafletMap } from "leaflet"

interface MapMarker {
  lat: number
  lng: number
  title: string
  phone?: string
}

interface LocationMapProps {
  center: [number, number]
  zoom?: number
  markers?: MapMarker[]
  className?: string
}

export function LocationMap({ center, zoom = 13, markers = [], className }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    let cancelled = false

    async function initMap() {
      if ((container as any)._leaflet_id) return

      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      if (cancelled) return
      if ((container as any)._leaflet_id) return

      const map = L.map(container!, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      const defaultIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background:#1a56db;color:white;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:bold;white-space:nowrap;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${markers[0]?.title || ""}</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      })

      markers.forEach((marker) => {
        L.marker([marker.lat, marker.lng], { icon: defaultIcon })
          .addTo(map)
          .bindPopup(`<b>${marker.title}</b>${marker.phone ? `<br>📞 ${marker.phone}` : ""}`)
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      cancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [center, zoom, markers])

  return <div ref={mapRef} className={`h-[400px] w-full rounded-lg ${className || ""}`} />
}
