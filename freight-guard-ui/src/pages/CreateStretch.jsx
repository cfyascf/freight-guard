import { useState } from "react"
import { ArrowLeft, Map as MapIcon, MapPin, Navigation, Save, Waypoints } from "lucide-react"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css" // Importação obrigatória do CSS do Leaflet

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Ícones personalizados para não usar o marcador padrão do Leaflet (que às vezes buga no React)
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

export default function CreateStretch() {
  // Estado para simular se a rota foi calculada
  const [routeCalculated, setRouteCalculated] = useState(false)

  // Coordenadas Mockadas para o protótipo
  const curitibaCoords = [-25.4284, -49.2733]
  const saoPauloCoords = [-23.5505, -46.6333]
  const centerMap = [-24.5, -48.0] // Centro entre as duas cidades

  return (
    <AppShell title="Cadastro de Novo Trecho">
      <div className="mx-auto max-w-6xl">
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/stretch-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/stretch-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/stretch-management">
                <Save size={16} className="mr-2" /> Salvar Trecho
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna da Esquerda: Formulário (1/3 da tela) */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-slate-200 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-bold text-slate-800">
                  <Waypoints size={18} className="mr-2 text-blue-600" /> Parâmetros do Trecho
                </CardTitle>
                <CardDescription>Defina os pontos exatos para traçar a rota no mapa.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Origem</p>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-2.5 text-blue-500" />
                    <Input defaultValue="Curitiba, PR" className="border-slate-200 pl-9 font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Destino</p>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-2.5 text-red-500" />
                    <Input defaultValue="São Paulo, SP" className="border-slate-200 pl-9 font-medium" />
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Distância (km)</p>
                    <Input
                      type="text"
                      value={routeCalculated ? "408 km" : "--"}
                      className="border-slate-200 bg-slate-50"
                      readOnly
                    />
                    <p className="text-xs text-slate-400">Calculado automaticamente pela malha rodoviária.</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-700">Tempo de Viagem</p>
                    <Input
                      type="text"
                      value={routeCalculated ? "5h 45m" : "--"}
                      className="border-slate-200 bg-slate-50"
                      readOnly
                    />
                  </div>
                </div>

                <Button
                  className={`mt-4 w-full text-white ${
                    routeCalculated ? "bg-green-600 hover:bg-green-700" : "bg-slate-800 hover:bg-slate-900"
                  }`}
                  onClick={() => setRouteCalculated(true)}
                >
                  <Navigation size={16} className="mr-2" />
                  {routeCalculated ? "Rota Calculada" : "Calcular Rota"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita: Mapa Leaflet (2/3 da tela) */}
          <div className="lg:col-span-2">
            <Card className="flex h-[600px] flex-col overflow-hidden border-slate-200 shadow-sm relative">
              <CardHeader className="absolute top-0 left-0 right-0 z-[1000] border-b border-slate-200 bg-white/90 backdrop-blur-sm pb-4 shadow-sm">
                <CardTitle className="flex items-center text-md font-bold text-slate-800">
                  <MapIcon size={18} className="mr-2 text-slate-500" /> Visualização do Trajeto
                </CardTitle>
              </CardHeader>

              {/* Container do Mapa (O z-index do leaflet é 400 por padrão) */}
              <div className="flex-1 w-full h-full pt-[72px]">
                <MapContainer center={centerMap} zoom={6} scrollWheelZoom={true} className="h-full w-full">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Marcador de Origem */}
                  <Marker position={curitibaCoords} icon={originIcon}>
                    <Popup>
                      <strong>Origem:</strong> Curitiba, PR
                    </Popup>
                  </Marker>

                  {/* Marcador de Destino */}
                  {routeCalculated && (
                    <>
                      <Marker position={saoPauloCoords} icon={destIcon}>
                        <Popup>
                          <strong>Destino:</strong> São Paulo, SP
                        </Popup>
                      </Marker>
                      
                      {/* Linha da Rota */}
                      <Polyline 
                        positions={[curitibaCoords, saoPauloCoords]} 
                        color="#3b82f6" 
                        weight={4} 
                        dashArray="10, 10" 
                      />
                    </>
                  )}
                </MapContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}