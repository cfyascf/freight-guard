<<<<<<< HEAD
import { ArrowLeft, MapPinned, Truck, Scale, Box, Gavel, Layers, Activity, CalendarClock, PackageOpen, Snowflake, AlertTriangle, CheckCircle2, Lock, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
=======
import {
  ArrowLeft,
  MapPinned,
  Truck,
  Scale,
  Box,
  Gavel,
  Layers,
  Activity,
  CalendarClock,
  PackageOpen,
  Snowflake,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
>>>>>>> main

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
<<<<<<< HEAD
import { useState } from "react"
import { getAvailableVehiclesForRoute } from "@/constants/logistics-mock"

// ==========================================
// MOCKS DA ROTA CONSOLIDADA 
=======
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ==========================================
// MOCKS DA ROTA CONSOLIDADA E FROTA
>>>>>>> main
// ==========================================
const mockRoute = {
  id: "ROT-9921",
  name: "Rota Sul-Sudeste Consolidada",
  status: "Em Leilão",
  risk: "WARNING",
  totalWeightKg: 25800,
  totalVolumeM3: 95,
  totalDistanceKm: 854,
  targetFare: 12500,
  bodyType: "Frigorífico (Trailers/Carretas)",
<<<<<<< HEAD
  
  // NOVOS DADOS: Especificações do Produto
=======

>>>>>>> main
  productDetails: {
    packaging: "28 Paletes PBR (Madeira)",
    type: "Caixas Master (Frango/Polpa)",
    temperature: "-18ºC (Congelado)",
<<<<<<< HEAD
    handling: "Carga Paletizada - Não Empilhar"
  },
  
  // Datas extraídas para destaque (SLA)
  sla: {
    firstPickup: "Hoje, 14:00h",
    lastDelivery: "Amanhã, 12:00h"
  },

  itinerary: [
    { city: "Curitiba, PR", action: "Coleta (2 Trechos)", time: "Hoje, 14:00h" },
    { city: "Joinville, PR", action: "Coleta (1 Trecho)", time: "Hoje, 17:00h" },
    { city: "São Paulo, SP", action: "Entrega Parcial", time: "Amanhã, 08:00h" },
    { city: "Campinas, SP", action: "Entrega Final", time: "Amanhã, 12:00h" },
  ],
  segments: [
    { id: "TRC-1042", load: "Frango Congelado", from: "Curitiba", to: "São Paulo", value: 4200 },
    { id: "TRC-1088", load: "Polpa de Fruta", from: "Curitiba", to: "Campinas", value: 5100 },
    { id: "TRC-1090", load: "Sorvetes", from: "Joinville", to: "São Paulo", value: 3200 },
=======
    handling: "Carga Paletizada - Não Empilhar",
  },

  sla: {
    firstPickup: "Hoje, 14:00h",
    lastDelivery: "Amanhã, 12:00h",
  },

  itinerary: [
    {
      city: "Curitiba, PR",
      action: "Coleta (2 Trechos)",
      time: "Hoje, 14:00h",
    },
    {
      city: "Joinville, PR",
      action: "Coleta (1 Trecho)",
      time: "Hoje, 17:00h",
    },
    {
      city: "São Paulo, SP",
      action: "Entrega Parcial",
      time: "Amanhã, 08:00h",
    },
    { city: "Campinas, SP", action: "Entrega Final", time: "Amanhã, 12:00h" },
  ],
  segments: [
    {
      id: "TRC-1042",
      load: "Frango Congelado",
      from: "Curitiba",
      to: "São Paulo",
      value: 4200,
    },
    {
      id: "TRC-1088",
      load: "Polpa de Fruta",
      from: "Curitiba",
      to: "Campinas",
      value: 5100,
    },
    {
      id: "TRC-1090",
      load: "Sorvetes",
      from: "Joinville",
      to: "São Paulo",
      value: 3200,
    },
>>>>>>> main
  ],
  auctionInfo: {
    bids: 18,
    bestBid: 11200,
    leader: "Expresso Frio Ltda",
<<<<<<< HEAD
  }
}

const formatWeight = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) => `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatCurrency = (value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value)
=======
  },
}

// Simulando a frota do transportador logado
const mockFleet = [
  {
    id: "V-001",
    name: "Carreta Frigorífica (Scania R450)",
    bodyType: "Frigorífico (Trailers/Carretas)",
    maxWeightKg: 28000,
    maxVolumeM3: 100,
  },
  {
    id: "V-002",
    name: "Truck Baú Seco (Volvo VM)",
    bodyType: "Carga Seca",
    maxWeightKg: 14000,
    maxVolumeM3: 45,
  },
  {
    id: "V-003",
    name: "Carreta Sider (DAF XF)",
    bodyType: "Baú Sider",
    maxWeightKg: 26000,
    maxVolumeM3: 105,
  },
]

const formatWeight = (value) =>
  `${new Intl.NumberFormat("pt-BR").format(value)} kg`
const formatVolume = (value) =>
  `${new Intl.NumberFormat("pt-BR").format(value)} m³`
const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value)
>>>>>>> main

function getStopBadgeClass(index, totalStops) {
  if (index === 0) return "bg-slate-800"
  if (index === totalStops - 1) return "bg-emerald-500"
  return "bg-blue-500"
}

<<<<<<< HEAD
export default function BidAnalysis() {
  const navigate = useNavigate()
  const route = mockRoute 
  const anttFloor = route.targetFare * 0.75 

  const [bidValue, setBidValue] = useState(route.targetFare)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  // Funções de ação rápida para o input de lance
  const applyLeaderBid = () => setBidValue(route.auctionInfo.bestBid - 50)
  const applyFloorBid = () => setBidValue(anttFloor)
  
  // Calcula veículos disponíveis para esta rota
  // Usando as datas do mock (hoje 14h até amanhã 12h)
  const routeStartDate = "2026-06-11T14:00:00" 
  const routeEndDate = "2026-06-12T12:00:00"
  const availableVehicles = getAvailableVehiclesForRoute(routeStartDate, routeEndDate, "Frigorífica")
  
  const getVehicleStatusBadge = (vehicle) => {
    if (vehicle.status === "MAINTENANCE") return { text: "Manutenção", class: "bg-slate-500" }
    if (vehicle.status === "LOCKED") return { text: "Bloqueado", class: "bg-rose-500" }
    if (vehicle.status === "IN_TRANSIT") return { text: "Em Trânsito", class: "bg-amber-500" }
    return { text: "Disponível", class: "bg-emerald-500" }
  }
=======
export default function SegmentDetails() {
  const navigate = useNavigate()
  const route = mockRoute
  const anttFloor = route.targetFare * 0.75

  const [bidValue, setBidValue] = useState(route.targetFare)
  const [selectedVehicleId, setSelectedVehicleId] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const applyLeaderBid = () => setBidValue(route.auctionInfo.bestBid - 50)
  const applyFloorBid = () => setBidValue(anttFloor)

  // ==========================================
  // FILTRO INTELIGENTE E TRAVA DE NEGÓCIO
  // ==========================================
  const compatibleFleet = mockFleet.filter(
    (v) =>
      v.maxWeightKg >= route.totalWeightKg &&
      v.maxVolumeM3 >= route.totalVolumeM3 &&
      v.bodyType === route.bodyType
  )

  const selectedVehicle = compatibleFleet.find(
    (v) => v.id === selectedVehicleId
  )
  const isBidBlocked = !selectedVehicle || !termsAccepted
>>>>>>> main

  return (
    <AppShell title={`Detalhes da Rota`}>
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
<<<<<<< HEAD
        
        {/* HEADER LIMPO */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-2 pt-1 mb-4">
          <Button variant="ghost" className="h-auto p-0 text-xs font-medium text-slate-500 hover:bg-transparent hover:text-slate-900" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-2" /> Voltar para a mesa de leilões
=======
        {/* HEADER */}
        <div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-200 pt-1 pb-2">
          <Button
            variant="ghost"
            className="h-auto p-0 text-xs font-medium text-slate-500 hover:bg-transparent hover:text-slate-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={14} className="mr-2" /> Voltar para a mesa de
            leilões
>>>>>>> main
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
<<<<<<< HEAD
          <div className="h-full overflow-y-auto pr-2 pb-6 space-y-4">

            {/* CABEÇALHO E SLA CRÍTICO */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Layers size={14} className="text-blue-500" />
                  <span className="font-mono text-xs font-bold text-slate-500">{route.id}</span>
                  <Badge className="bg-slate-800 text-white text-[9px] uppercase font-bold border-none hover:bg-slate-800">{route.status}</Badge>
                </div>
                <h1 className="text-xl font-black text-slate-900">{route.name}</h1>
              </div>

              {/* BANNER DE SLA (Data/Hora em Evidência) */}
              <div className="flex flex-col md:flex-row border border-slate-200 rounded-xl overflow-hidden">
                  <div className="flex-1 bg-amber-50 p-3 border-b md:border-b-0 md:border-r border-slate-200 flex items-center gap-3">
                      <div className="bg-amber-100 p-1.5 rounded-lg text-amber-700">
                          <CalendarClock size={16} />
                      </div>
                      <div>
                          <p className="text-[9px] font-bold uppercase text-amber-700/70 tracking-wider">Primeira Coleta SLA</p>
                          <p className="font-black text-xs text-amber-900">{route.sla.firstPickup}</p>
                      </div>
                  </div>
                  <div className="flex-1 bg-emerald-50 p-3 flex items-center gap-3">
                      <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-700">
                          <MapPinned size={16} />
                      </div>
                      <div>
                          <p className="text-[9px] font-bold uppercase text-emerald-700/70 tracking-wider">Última Entrega SLA</p>
                          <p className="font-black text-xs text-emerald-900">{route.sla.lastDelivery}</p>
                      </div>
                  </div>
              </div>
            </div>

            {/* PAINEL DE AÇÃO (LANCE) E ESTRATÉGIA */}
            <div className="grid grid-cols-1 gap-4">
                
                {/* 1. LANCE E SELEÇÃO DE VEÍCULO */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                            <Gavel size={14} className="text-blue-600" /> Formulário de Lance
                        </h3>
                        <Badge variant="outline" className="border-blue-200 bg-white text-blue-700 text-[9px]">Teto: {formatCurrency(route.targetFare)}</Badge>
                    </div>
                    
                    <div className="space-y-4">
                        {/* Input de Valor */}
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                Valor da Proposta
                            </p>
                            <div className="bg-white border border-slate-300 rounded-lg p-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                <div className="flex items-center px-2">
                                    <span className="text-xs font-bold text-slate-400">R$</span>
                                    <Input 
                                        type="number" 
                                        value={bidValue}
                                        onChange={(e) => setBidValue(e.target.value)}
                                        className="border-0 shadow-none focus-visible:ring-0 text-xl font-black font-mono text-slate-800 h-10" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botões de Ação Rápida */}
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" onClick={applyLeaderBid} className="text-[10px] font-bold border-slate-200 bg-white text-slate-600 h-7">
                                Cobrir Líder
                            </Button>
                            <Button variant="outline" size="sm" onClick={applyFloorBid} className="text-[10px] font-bold border-slate-200 bg-white text-slate-600 h-7">
                                Piso ANTT
                            </Button>
                        </div>
                        
                        {/* SELETOR DE VEÍCULO */}
                        <div className="border-t border-slate-200/50 pt-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                                <Truck size={12} className="text-blue-600" /> 
                                Veículo Alocado para Esta Rota
                            </p>
                            <p className="text-[9px] text-slate-500 mb-3">
                                Ao confirmar o lance, o veículo selecionado será bloqueado para este período
                            </p>
                            
                            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                                {availableVehicles.length === 0 ? (
                                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-center">
                                        <Lock size={16} className="text-rose-500 mx-auto mb-1" />
                                        <p className="text-[10px] font-bold text-rose-700">Nenhum veículo disponível para este período</p>
                                    </div>
                                ) : (
                                    availableVehicles.map((vehicle) => {
                                        const statusBadge = getVehicleStatusBadge(vehicle)
                                        const isSelected = selectedVehicle?.id === vehicle.id
                                        
                                        return (
                                            <button
                                                key={vehicle.id}
                                                type="button"
                                                onClick={() => setSelectedVehicle(vehicle)}
                                                className={`w-full text-left border rounded-lg p-3 transition-all ${
                                                    isSelected 
                                                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-600' : 'bg-slate-100'}`}>
                                                            {isSelected ? (
                                                                <CheckCircle2 size={16} className="text-white" />
                                                            ) : (
                                                                <Truck size={14} className="text-slate-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-mono text-sm font-black text-slate-900">{vehicle.plate}</p>
                                                            <p className="text-[9px] font-semibold text-slate-500">{vehicle.type}</p>
                                                        </div>
                                                    </div>
                                                    <Badge className={`${statusBadge.class} text-white text-[8px] font-bold border-none hover:${statusBadge.class}`}>
                                                        {statusBadge.text}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-2 text-[9px]">
                                                    <div className="flex items-center gap-1 text-slate-600">
                                                        <User size={10} className="text-slate-400" />
                                                        <span className="font-semibold">{vehicle.driver}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-mono font-bold text-slate-700">{vehicle.capacity}</span>
                                                    </div>
                                                </div>
                                                
                                                {vehicle.lockedPeriods.length > 0 && (
                                                    <div className="mt-2 pt-2 border-t border-slate-100">
                                                        <p className="text-[8px] font-bold text-amber-700 flex items-center gap-1">
                                                            <Lock size={9} /> Bloqueios ativos: {vehicle.lockedPeriods.length}
                                                        </p>
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })
                                )}
                            </div>
                            
                            {!selectedVehicle && availableVehicles.length > 0 && (
                                <p className="text-[9px] font-semibold text-amber-600 mt-2 flex items-center gap-1">
                                    <AlertTriangle size={10} /> Selecione um veículo para prosseguir
                                </p>
                            )}
                        </div>

                        <Button 
                            disabled={!selectedVehicle}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {selectedVehicle 
                                ? `Confirmar Lance com ${selectedVehicle.plate}` 
                                : "Selecione um Veículo para Confirmar"
                            }
                        </Button>
                    </div>
                </div>

                {/* 2. ESTRATÉGIA E RANKING */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col justify-between">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-xs">
                        <Activity size={14} className="text-slate-500" /> Mercado & Concorrência
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Seu Rank Atual</p>
                             <p className="text-xl font-black text-slate-800">#4</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
                             <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Lances Ativos</p>
                             <p className="text-xl font-black text-blue-600">{route.auctionInfo.bids}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Melhor Oferta (Líder)</p>
                            <p className="text-xs font-black font-mono text-emerald-600">{formatCurrency(route.auctionInfo.bestBid)}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-[9px] font-bold text-slate-400 uppercase">Distância P/ Lider</p>
                             <p className="text-xs font-bold font-mono text-rose-500">- R$ 300</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAINEL TÉCNICO: PRODUTO E EQUIPAMENTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Informações Críticas do Produto */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <PackageOpen size={14} className="text-blue-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Especificações da Carga</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Embalagem Base</p>
                        <p className="mt-0.5 text-xs font-bold text-slate-800">{route.productDetails.packaging}</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Tipo de Produto</p>
                        <p className="mt-0.5 text-xs font-bold text-slate-800">{route.productDetails.type}</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><Snowflake size={10}/> Temperatura</p>
                        <p className="mt-0.5 text-xs font-bold text-blue-600">{route.productDetails.temperature}</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1"><AlertTriangle size={10}/> Manuseio</p>
                        <p className="mt-0.5 text-xs font-bold text-rose-600">{route.productDetails.handling}</p>
                    </div>
                </div>
              </div>

              {/* Capacidade e Veículo */}
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 flex flex-col">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <Truck size={14} className="text-blue-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Exigência de Equipamento</h2>
                </div>
                <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Frota Recomendada</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-800">{route.bodyType}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 mt-auto">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Peso Consolidado</p>
                      <p className="mt-0.5 font-mono text-xs font-black text-slate-800 flex items-center gap-1"><Scale size={12} className="text-slate-400"/> {formatWeight(route.totalWeightKg)}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Cubagem (Volume)</p>
                      <p className="mt-0.5 font-mono text-xs font-black text-slate-800 flex items-center gap-1"><Box size={12} className="text-slate-400"/> {formatVolume(route.totalVolumeM3)}</p>
                    </div>
                </div>
              </div>
            </div>

            {/* ITINERÁRIO */}
            <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                    <MapPinned size={14} className="text-slate-600" />
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Plano de Viagem (Milking Run)</h2>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    {route.itinerary.map((stop) => (
                        <div key={stop.city} className="flex md:flex-col gap-3 md:gap-0 items-center text-center">
                             <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-black text-white ${getStopBadgeClass(route.itinerary.indexOf(stop), route.itinerary.length)}`}>
                                {route.itinerary.indexOf(stop) + 1}
                             </div>
                             <div className="md:mt-2 text-left md:text-center">
                                <p className="text-xs font-bold text-slate-900">{stop.city}</p>
                                <p className="text-[9px] font-medium text-slate-500 mt-0.5">{stop.action}</p>
                                <p className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded mt-1 inline-block">{stop.time}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TRECHOS COMPOSIÇÃO */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-slate-600" />
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Trechos Contidos nesta Rota ({route.segments.length})</h2>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {route.segments.map((seg) => (
                  <div key={seg.id} className="flex items-center justify-between px-4 py-2.5 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{seg.id}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{seg.load}</p>
                        <p className="text-[9px] font-medium text-slate-500">{seg.from} ➔ {seg.to}</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold font-mono text-slate-600">Teto: {formatCurrency(seg.value)}</p>
=======
          <div className="h-full space-y-4 overflow-y-auto pr-2 pb-6">
            {/* CABEÇALHO E SLA */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Layers size={14} className="text-blue-500" />
                  <span className="font-mono text-xs font-bold text-slate-500">
                    {route.id}
                  </span>
                  <Badge className="border-none bg-slate-800 text-[9px] font-bold text-white uppercase hover:bg-slate-800">
                    {route.status}
                  </Badge>
                </div>
                <h1 className="text-xl font-black text-slate-900">
                  {route.name}
                </h1>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 md:flex-row">
                <div className="flex flex-1 items-center gap-3 border-b border-slate-200 bg-amber-50 p-3 md:border-r md:border-b-0">
                  <div className="rounded-lg bg-amber-100 p-1.5 text-amber-700">
                    <CalendarClock size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-amber-700/70 uppercase">
                      Primeira Coleta SLA
                    </p>
                    <p className="text-xs font-black text-amber-900">
                      {route.sla.firstPickup}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 items-center gap-3 bg-emerald-50 p-3">
                  <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700">
                    <MapPinned size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-emerald-700/70 uppercase">
                      Última Entrega SLA
                    </p>
                    <p className="text-xs font-black text-emerald-900">
                      {route.sla.lastDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LAYOUT PRINCIPAL: 2 COLUNAS DE MESMA ALTURA */}
            {/* Removido o items-start para que ambas as colunas estiquem igual */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* ========================================================= */}
              {/* COLUNA ESQUERDA: FORMULÁRIO DE LANCE (Altura Total: h-full) */}
              {/* ========================================================= */}
              <div className="flex h-full flex-col rounded-xl border border-blue-200 bg-blue-50/30 p-4">
                {/* PARTE SUPERIOR DO FORMULÁRIO */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900">
                      <Gavel size={14} className="text-blue-600" /> Formulário
                      de Lance
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-blue-200 bg-white text-[9px] text-blue-700"
                    >
                      Teto: {formatCurrency(route.targetFare)}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {/* Seleção do Veículo */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                        Selecione um Veículo Compatível da Frota
                      </label>
                      <Select
                        value={selectedVehicleId}
                        onValueChange={setSelectedVehicleId}
                      >
                        <SelectTrigger className="h-9 border-slate-200 bg-white text-xs focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue
                            placeholder={
                              compatibleFleet.length > 0
                                ? "Escolha um caminhão..."
                                : "Nenhum compatível."
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {compatibleFleet.map((v) => (
                            <SelectItem
                              key={v.id}
                              value={v.id}
                              className="text-xs"
                            >
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dashboard Visual de Validação */}
                    {selectedVehicle ? (
                      <div className="animate-in space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/80 p-2.5 duration-200 zoom-in-95 fade-in">
                        <div className="mb-1 flex items-center gap-1.5">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-600"
                          />
                          <p className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                            Equipamento Validado pelo Sistema
                          </p>
                        </div>

                        <div className="rounded border border-emerald-100 bg-white p-2.5">
                          <div className="mb-2.5 flex items-start justify-between border-b border-slate-100 pb-2.5">
                            <div className="flex flex-col pr-2">
                              <span className="mb-0.5 text-[9px] font-bold text-slate-400 uppercase">
                                Carroceria
                              </span>
                              <span className="text-xs leading-snug font-bold whitespace-normal text-slate-700">
                                {selectedVehicle.bodyType}
                              </span>
                            </div>
                            <Badge className="mt-0.5 shrink-0 border-none bg-emerald-100 px-1.5 py-0 text-[9px] text-emerald-700 hover:bg-emerald-100">
                              OK
                            </Badge>
                          </div>

                          <div className="flex flex-col">
                            <div className="mb-1 flex items-end justify-between">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">
                                Peso da Carga
                              </span>
                              <span className="text-[10px] font-bold text-slate-700">
                                {formatWeight(route.totalWeightKg)}{" "}
                                <span className="font-normal text-slate-400">
                                  / Cap:{" "}
                                  {formatWeight(selectedVehicle.maxWeightKg)}
                                </span>
                              </span>
                            </div>
                            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full bg-emerald-500"
                                style={{
                                  width: `${(route.totalWeightKg / selectedVehicle.maxWeightKg) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-white/50 p-4 text-center">
                        <Truck
                          size={20}
                          className="mx-auto mb-1 text-slate-300"
                        />
                        <p className="text-[10px] leading-normal font-semibold text-slate-500">
                          Selecione um veículo compatível acima para
                          <br /> prosseguir com a oferta do lance.
                        </p>
                      </div>
                    )}

                    {/* Termo de Responsabilidade */}
                    <div
                      className={`flex items-start gap-2.5 rounded-lg border p-2.5 transition-colors ${termsAccepted ? "border-blue-200 bg-blue-50/50" : "border-slate-200 bg-white"}`}
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
                      />
                      <label
                        htmlFor="terms"
                        className="cursor-pointer text-[10px] leading-snug font-semibold text-slate-600"
                      >
                        Declaro que o veículo possui todas as especificações
                        técnicas e condições necessárias para o transporte.
                      </label>
                    </div>
                  </div>
                </div>

                {/* PARTE INFERIOR DO FORMULÁRIO (Empurrada para alinhar no fundo da coluna) */}
                <div className="mt-auto space-y-2.5 pt-6">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                      Valor da Proposta
                    </label>
                    <div
                      className={`rounded-lg border bg-white p-1 transition-all ${isBidBlocked ? "border-slate-200 bg-slate-50 opacity-60" : "border-slate-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"}`}
                    >
                      <div className="flex items-center px-2">
                        <span className="text-xs font-bold text-slate-400">
                          R$
                        </span>
                        <Input
                          type="number"
                          value={bidValue}
                          onChange={(e) => setBidValue(e.target.value)}
                          disabled={isBidBlocked}
                          className="h-9 border-0 bg-transparent font-mono text-xl font-black text-slate-800 shadow-none focus-visible:ring-0 disabled:opacity-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyLeaderBid}
                      disabled={isBidBlocked}
                      className="h-7 border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Cobrir Líder
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={applyFloorBid}
                      disabled={isBidBlocked}
                      className="h-7 border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Piso ANTT
                    </Button>
                  </div>

                  <Button
                    disabled={isBidBlocked}
                    className="h-10 w-full bg-blue-600 text-xs font-bold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:opacity-100"
                  >
                    {!selectedVehicle
                      ? "Selecione um Veículo"
                      : !termsAccepted
                        ? "Aceite o Termo para Continuar"
                        : "Confirmar Lance Oficial"}
                  </Button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* COLUNA DIREITA: INFORMAÇÕES DE CONTEXTO EMPILHADAS          */}
              {/* ========================================================= */}
              <div className="flex flex-col space-y-4">
                {/* 1. Mercado & Concorrência */}
                <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Activity size={14} className="text-slate-500" /> Mercado &
                    Concorrência
                  </h3>

                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <p className="mb-0.5 text-[9px] font-bold text-slate-400 uppercase">
                        Seu Rank Atual
                      </p>
                      <p className="text-xl font-black text-slate-800">#4</p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <p className="mb-0.5 text-[9px] font-bold text-slate-400 uppercase">
                        Lances Ativos
                      </p>
                      <p className="text-xl font-black text-blue-600">
                        {route.auctionInfo.bids}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">
                        Melhor Oferta (Líder)
                      </p>
                      <p className="font-mono text-xs font-black text-emerald-600">
                        {formatCurrency(route.auctionInfo.bestBid)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">
                        Distância P/ Líder
                      </p>
                      <p className="font-mono text-xs font-bold text-rose-500">
                        - R$ 300
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Especificações da Carga */}
                <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <PackageOpen size={14} className="text-blue-600" />
                    <h2 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                      Especificações da Carga
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-4">
                    <div>
                      <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        Embalagem Base
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-800">
                        {route.productDetails.packaging}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        Tipo de Produto
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-800">
                        {route.productDetails.type}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        <Snowflake size={10} /> Temperatura
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-blue-600">
                        {route.productDetails.temperature}
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        <AlertTriangle size={10} /> Manuseio
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-rose-600">
                        {route.productDetails.handling}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Resumo da Rota e Equipamento */}
                <div className="flex flex-1 flex-col rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <Truck size={14} className="text-blue-600" />
                    <h2 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                      Resumo da Rota e Equipamento
                    </h2>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                      Frota Recomendada
                    </p>
                    <p className="mt-0.5 text-xs leading-snug font-bold whitespace-normal text-slate-800">
                      {route.bodyType}
                    </p>
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        Peso Consolidado
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 font-mono text-xs font-black text-slate-800">
                        <Scale size={12} className="text-slate-400" />{" "}
                        {formatWeight(route.totalWeightKg)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                        Cubagem (Volume)
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 font-mono text-xs font-black text-slate-800">
                        <Box size={12} className="text-slate-400" />{" "}
                        {formatVolume(route.totalVolumeM3)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ITINERÁRIO (LARGURA TOTAL) */}
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                <MapPinned size={14} className="text-slate-600" />
                <h2 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                  Plano de Viagem (Milking Run)
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-4">
                {route.itinerary.map((stop, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-center md:flex-col md:gap-0"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white ${getStopBadgeClass(index, route.itinerary.length)}`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-left md:mt-2 md:text-center">
                      <p className="text-xs font-bold text-slate-900">
                        {stop.city}
                      </p>
                      <p className="mt-0.5 text-[9px] font-medium text-slate-500">
                        {stop.action}
                      </p>
                      <p className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-700">
                        {stop.time}
                      </p>
                    </div>
>>>>>>> main
                  </div>
                ))}
              </div>
            </div>

<<<<<<< HEAD
=======
            {/* TRECHOS COMPOSIÇÃO (LARGURA TOTAL) */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-slate-600" />
                  <h2 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                    Trechos Contidos nesta Rota ({route.segments.length})
                  </h2>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {route.segments.map((seg) => (
                  <div
                    key={seg.id}
                    className="flex items-center justify-between bg-slate-50/50 px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        {seg.id}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {seg.load}
                        </p>
                        <p className="text-[9px] font-medium text-slate-500">
                          {seg.from} ➔ {seg.to}
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-[11px] font-bold text-slate-600">
                      Teto: {formatCurrency(seg.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
>>>>>>> main
          </div>
        </div>
      </div>
    </AppShell>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> main
