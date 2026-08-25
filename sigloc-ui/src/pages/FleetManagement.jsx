/* eslint-disable react/prop-types */
import { Truck, Lock, Calendar, User, Phone, Wrench, MapPin, CheckCircle2, AlertTriangle, Clock } from "lucide-react"
import { useState } from "react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vehicleFleetMock } from "@/constants/logistics-mock"

const getVehicleStatusConfig = (status) => {
  const configs = {
    AVAILABLE: {
      badge: "Disponível",
      badgeClass: "bg-emerald-500 text-white hover:bg-emerald-500",
      bgClass: "bg-emerald-50",
      borderClass: "border-emerald-200",
      icon: CheckCircle2,
      iconColor: "text-emerald-600"
    },
    LOCKED: {
      badge: "Bloqueado",
      badgeClass: "bg-rose-500 text-white hover:bg-rose-500",
      bgClass: "bg-rose-50",
      borderClass: "border-rose-200",
      icon: Lock,
      iconColor: "text-rose-600"
    },
    IN_TRANSIT: {
      badge: "Em Trânsito",
      badgeClass: "bg-amber-500 text-white hover:bg-amber-500",
      bgClass: "bg-amber-50",
      borderClass: "border-amber-200",
      icon: Clock,
      iconColor: "text-amber-600"
    },
    MAINTENANCE: {
      badge: "Manutenção",
      badgeClass: "bg-slate-500 text-white hover:bg-slate-500",
      bgClass: "bg-slate-50",
      borderClass: "border-slate-200",
      icon: Wrench,
      iconColor: "text-slate-600"
    }
  }
  return configs[status] || configs.AVAILABLE
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  })
}

function VehicleCard({ vehicle }) {
  const [expanded, setExpanded] = useState(false)
  const config = getVehicleStatusConfig(vehicle.status)

  return (
    <div className={`rounded-xl border ${config.borderClass} bg-white overflow-hidden`}>
      {/* Header do Card */}
      <div className={`${config.bgClass} border-b ${config.borderClass} p-4`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg ${config.bgClass} border ${config.borderClass} flex items-center justify-center`}>
              <Truck size={20} className={config.iconColor} />
            </div>
            <div>
              <h3 className="font-mono text-lg font-black text-slate-900">{vehicle.plate}</h3>
              <p className="text-xs font-semibold text-slate-600">{vehicle.type}</p>
            </div>
          </div>
          <Badge className={`${config.badgeClass} text-[9px] font-bold border-none`}>
            {config.badge}
          </Badge>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-4 space-y-4">
        {/* Informações Principais */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Motorista</p>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <User size={12} className="text-slate-400" />
              {vehicle.driver}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Telefone</p>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Phone size={12} className="text-slate-400" />
              {vehicle.driverPhone}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Capacidade</p>
            <p className="text-xs font-mono font-black text-slate-900">{vehicle.capacity}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Volume</p>
            <p className="text-xs font-mono font-black text-slate-900">{vehicle.volumeM3} m³</p>
          </div>
        </div>

        {/* Localização Atual */}
        <div className="border-t border-slate-100 pt-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Localização Atual</p>
          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <MapPin size={12} className="text-blue-500" />
            {vehicle.currentLocation}
          </p>
        </div>

        {/* Características Técnicas */}
        <div className="border-t border-slate-100 pt-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">Características</p>
          <div className="flex flex-wrap gap-1.5">
            {vehicle.features.map((feature) => (
              <Badge key={feature} variant="outline" className="text-[9px] border-slate-200 text-slate-600">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bloqueios (se houver) */}
        {vehicle.lockedPeriods.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                <Lock size={12} />
                Bloqueios Ativos ({vehicle.lockedPeriods.length})
              </p>
              <Badge className="bg-rose-100 text-rose-700 border-none text-[9px] hover:bg-rose-100">
                {expanded ? "Ocultar" : "Ver Detalhes"}
              </Badge>
            </button>

            {expanded && (
              <div className="mt-3 space-y-2">
                {vehicle.lockedPeriods.map((period) => (
                  <div key={period.bidId} className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                    <p className="text-xs font-bold text-slate-900 mb-1">{period.routeName}</p>
                    <p className="text-[9px] font-mono text-slate-600 mb-1">ID: {period.routeId}</p>
                    <div className="flex items-center gap-2 text-[9px] text-slate-600">
                      <Calendar size={10} className="text-rose-500" />
                      <span>{formatDate(period.startDate)} → {formatDate(period.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Manutenção */}
        {vehicle.status === "MAINTENANCE" && vehicle.maintenanceReason && (
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
              <AlertTriangle size={10} className="text-amber-500" /> Motivo da Manutenção
            </p>
            <p className="text-xs font-semibold text-amber-700">{vehicle.maintenanceReason}</p>
          </div>
        )}

        <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 text-[9px]">
          <div>
            <p className="font-bold uppercase tracking-wider text-slate-400 mb-0.5">Última Manutenção</p>
            <p className="font-semibold text-slate-700">{vehicle.lastMaintenance}</p>
          </div>
          <div>
            <p className="font-bold uppercase tracking-wider text-slate-400 mb-0.5">Próxima Manutenção</p>
            <p className="font-semibold text-slate-700">{vehicle.nextMaintenance}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FleetManagement() {
  const [filterStatus, setFilterStatus] = useState("ALL")

  const filteredVehicles = vehicleFleetMock.filter((vehicle) => {
    if (filterStatus === "ALL") return true
    return vehicle.status === filterStatus
  })

  const stats = {
    total: vehicleFleetMock.length,
    available: vehicleFleetMock.filter((v) => v.status === "AVAILABLE").length,
    locked: vehicleFleetMock.filter((v) => v.status === "LOCKED").length,
    inTransit: vehicleFleetMock.filter((v) => v.status === "IN_TRANSIT").length,
    maintenance: vehicleFleetMock.filter((v) => v.status === "MAINTENANCE").length,
  }

  return (
    <AppShell title="Gestão de Frota">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-4">
          <div>
            <h1 className="text-xl font-black text-slate-900">Gestão de Frota</h1>
            <p className="text-xs text-slate-500 mt-0.5">Visualize e gerencie todos os veículos da sua transportadora</p>
          </div>
        </div>

        {/* ESTATÍSTICAS RÁPIDAS */}
        <div className="shrink-0 grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total</p>
            <p className="text-2xl font-black text-slate-900">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Disponíveis</p>
            <p className="text-2xl font-black text-emerald-700">{stats.available}</p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-rose-600 mb-1">Bloqueados</p>
            <p className="text-2xl font-black text-rose-700">{stats.locked}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600 mb-1">Em Trânsito</p>
            <p className="text-2xl font-black text-amber-700">{stats.inTransit}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600 mb-1">Manutenção</p>
            <p className="text-2xl font-black text-slate-700">{stats.maintenance}</p>
          </div>
        </div>

        {/* TABS DE FILTRO */}
        <Tabs value={filterStatus} onValueChange={setFilterStatus} className="shrink-0 mb-4">
          <TabsList className="bg-slate-100 border border-slate-200">
            <TabsTrigger value="ALL" className="text-xs">
              Todos ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="AVAILABLE" className="text-xs">
              Disponíveis ({stats.available})
            </TabsTrigger>
            <TabsTrigger value="LOCKED" className="text-xs">
              Bloqueados ({stats.locked})
            </TabsTrigger>
            <TabsTrigger value="IN_TRANSIT" className="text-xs">
              Em Trânsito ({stats.inTransit})
            </TabsTrigger>
            <TabsTrigger value="MAINTENANCE" className="text-xs">
              Manutenção ({stats.maintenance})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ÁREA ROLÁVEL */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Truck size={48} className="text-slate-300 mb-3" />
                <p className="text-sm font-bold text-slate-600">Nenhum veículo encontrado</p>
                <p className="text-xs text-slate-400 mt-1">Ajuste os filtros para ver mais resultados</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
