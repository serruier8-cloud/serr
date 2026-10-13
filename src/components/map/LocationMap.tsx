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
  locateUser?: boolean
}

export function LocationMap({ center, zoom = 13, markers = [], className, locateUser = false }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<LeafletMap | null>(null)
  const userMarkerRef = useRef<{ lat: number; lng: number; marker: unknown; circle: unknown } | null>(null)

  useEffect(() => {
    const container = mapRef.current
    if (!container) return

    let cancelled = false
    type LeafletContainer = HTMLDivElement & { _leaflet_id?: number }

    async function initMap() {
      if ((container as LeafletContainer)._leaflet_id) return

      const L = await import("leaflet")
      await import("leaflet/dist/leaflet.css")

      if (cancelled) return
      if ((container as LeafletContainer)._leaflet_id) return

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
      userMarkerRef.current = null
    }
  }, [center, zoom, markers])

  useEffect(() => {
    if (!locateUser || !mapInstanceRef.current || userMarkerRef.current) return

    const map = mapInstanceRef.current
    const bound = () => {
      if (!("geolocation" in navigator)) return
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (userMarkerRef.current || !mapInstanceRef.current) return
          const L = await import("leaflet")
          const { latitude, longitude } = pos.coords
          const circle = L.circle([latitude, longitude], {
            radius: 250,
            color: "#1a56db",
            fillColor: "#1a56db",
            fillOpacity: 0.15,
            weight: 2,
          }).addTo(map)
          const marker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: "custom-marker",
              html: `<div style="background:#ffffff;border:3px solid #1a56db;width:14px;height:14px;border-radius:50%;box-shadow:0 0 0 4px rgba(26,86,219,0.2)"></div>`,
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            }),
          })
            .addTo(map)
            .bindPopup("📍 " + (navigator.language?.startsWith("ar") ? "موقعك" : navigator.language?.startsWith("fr") ? "Votre position" : "Your location"))
          userMarkerRef.current = { lat: latitude, lng: longitude, marker, circle }
          const bounds = L.latLngBounds([[latitude, longitude] as [number, number]])
          markers.forEach((m) => bounds.extend([m.lat, m.lng]))
          map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
        },
        () => {},
        { timeout: 10000, maximumAge: 60000 }
      )
    }

    const t = setTimeout(bound, 300)
    return () => clearTimeout(t)
  }, [locateUser, markers])

  return <div ref={mapRef} className={`h-[400px] w-full rounded-lg ${className || ""}`} />
}
