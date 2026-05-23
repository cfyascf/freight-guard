import { useState, useEffect } from "react"
import { ArrowLeft, Map as MapIcon, MapPin, Navigation, Save, Waypoints } from "lucide-react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Ícones personalizados para o Leaflet
const originIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

const destIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="w-5 h-5 bg-red-500 rounded-full border-2 border-white shadow-md"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

// Dicionário de mock de dados para simular a edição com base no ID
const STRETCH_MOCKS = {
  "1": { origin: "Curitiba, PR", destination: "São Paulo, SP", distance: "408 km", duration: "5h 45m", coords: { origin: [-25.4284, -49.2733], dest: [-23.5505, -46.6333], center: [-24.5, -48.0] } },
  "2": { origin: "São Paulo, SP", destination: "Campinas, SP", distance: "99 km", duration: "1h 20m", coords: { origin: [-23.5505, -46.6333], dest: [-22.9099, -47.0626], center: [-23.2, -46.8] } }
}

export default function EditStretch() {
  const { stretchId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ origin: "", destination: "", distance: "--", duration: "--" })
  const [coords, setCoords] = useState({ origin: [0, 0], dest: [0, 0], center: [0, 0] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula a busca dos dados do trecho pelo ID (Back-end)
    const stretch = STRETCH_MOCKS[stretchId] || STRETCH_MOCKS["1"]
    setFormData({
      origin: stretch.origin,
      destination: stretch.destination,
      distance: stretch.distance,
      duration: stretch.duration
    })
    setCoords(stretch.coords)
    setLoading(false)
  }, [stretchId])

  if (loading) {
    return <AppShell title="Editar Trecho"><div className="p-6">A carregar dados do trecho...</div></AppShell>
  }

  return (
    <AppShell title={`Editar Trecho #${stretchId}`}>
      <div className="mx-auto max-w-6xl">
        
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/stretch-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-slate-200" onClick={() => navigate("/stretch-management")}>
              Cancelar
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate("/stretch-management")}>
              <Save size={16} className="mr-2" /> Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Formulário */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-slate-200 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-bold text-slate-800">
                  <Waypoints size={18} className="mr-2 text-blue-600" /> Parâmetros do Trecho
                </CardTitle>
                <CardDescription>Modifique os pontos desejados para recalcular o trajeto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Origem</p>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-2.5 text-blue-500" />
                    <Input 
                      value={formData.origin} 
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="border-slate-200 pl-9 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Destino</p>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-2.5 text-red-500" />
                    <Input 
                      value={formData.destination} 
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="border-slate-200 pl-9 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Distância</p>
                    <Input type="text" value={formData.distance} className="border-slate-200 bg-slate-50" readOnly />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Tempo de Viagem Estimado</p>
                    <Input type="text" value={formData.duration} className="border-slate-200 bg-slate-50" readOnly />
                  </div>
                </div>

                <Button className="mt-4 w-full text-white bg-slate-800 hover:bg-slate-900">
                  <Navigation size={16} className="mr-2" />
                  Recalcular Rota
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <Card className="flex h-[600px] flex-col overflow-hidden border-slate-200 shadow-sm relative">
              <CardHeader className="absolute top-0 left-0 right-0 z-[1000] border-b border-slate-200 bg-white/90 backdrop-blur-sm pb-4 shadow-sm">
                <CardTitle className="flex items-center text-md font-bold text-slate-800">
                  <MapIcon size={18} className="mr-2 text-slate-500" /> Itinerário Atualizado
                </CardTitle>
              </CardHeader>

              <div className="flex-1 w-full h-full pt-[72px]">
                <MapContainer center={coords.center} zoom={stretchId === "2" ? 9 : 6} scrollWheelZoom={true} className="h-full w-full">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <Marker position={coords.origin} icon={originIcon}>
                    <Popup><strong>Origem:</strong> {formData.origin}</Popup>
                  </Marker>

                  <Marker position={coords.dest} icon={destIcon}>
                    <Popup><strong>Destino:</strong> {formData.destination}</Popup>
                  </Marker>
                  
                  <Polyline positions={[coords.origin, coords.dest]} color="#3b82f6" weight={4} dashArray="10, 10" />
                </MapContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}