'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { Bus, MapPin, School, Home } from 'lucide-react'

// Coordinates (Demo Data - let's use a nice area, e.g. Delhi or Mumbai, let's use Mumbai)
// Or just abstract coordinates.
const START_POS: [number, number] = [19.0760, 72.8777] // Mumbai rough center
const MID_POS: [number, number] = [19.0800, 72.8800]
const END_POS: [number, number] = [19.0850, 72.8850]

// Route Path
const routePath: [number, number][] = [
  START_POS,
  [19.0770, 72.8780],
  [19.0780, 72.8790],
  MID_POS,
  [19.0820, 72.8820],
  [19.0830, 72.8830],
  END_POS
]

export default function LiveMap() {
  const [busPos, setBusPos] = useState<[number, number]>(START_POS)
  const [progress, setProgress] = useState(0)

  // Simulate bus movement along the path
  useEffect(() => {
    let currentPoint = 0
    
    const interval = setInterval(() => {
      currentPoint = (currentPoint + 1) % routePath.length
      setBusPos(routePath[currentPoint])
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Create custom beautiful icons using Lucide
  const createIcon = (iconElement: React.ReactElement, color: string, bgColor: string) => {
    const html = renderToStaticMarkup(
      <div style={{
        background: bgColor,
        color: color,
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        border: `2px solid ${color}`
      }}>
        {iconElement}
      </div>
    )
    return L.divIcon({ html, className: '', iconSize: [36, 36], iconAnchor: [18, 18] })
  }

  const busIconHtml = renderToStaticMarkup(
    <div style={{
      background: '#fbbf24',
      color: 'white',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      border: `2px solid white`
    }}>
      <Bus size={20} color="#b45309" />
    </div>
  )
  const busIcon = L.divIcon({ html: busIconHtml, className: '', iconSize: [40, 40], iconAnchor: [20, 20] })

  const homeIcon = createIcon(<Home size={18} />, 'var(--primary)', 'white')
  const schoolIcon = createIcon(<School size={18} />, 'var(--success)', 'white')
  const stopIcon = createIcon(<MapPin size={18} />, 'var(--ink-light)', 'white')

  return (
    <MapContainer 
      center={MID_POS} 
      zoom={14} 
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      {/* Route Line */}
      <Polyline positions={routePath} color="var(--primary)" weight={5} opacity={0.6} dashArray="10, 10" />

      {/* Markers */}
      <Marker position={START_POS} icon={homeIcon}>
        <Popup>Student's Home</Popup>
      </Marker>

      <Marker position={MID_POS} icon={stopIcon}>
        <Popup>Intermediate Stop</Popup>
      </Marker>

      <Marker position={END_POS} icon={schoolIcon}>
        <Popup>DPS School</Popup>
      </Marker>

      {/* The Animated Bus */}
      <Marker position={busPos} icon={busIcon}>
        <Popup>Bus WB-12-X-3456</Popup>
      </Marker>
    </MapContainer>
  )
}
