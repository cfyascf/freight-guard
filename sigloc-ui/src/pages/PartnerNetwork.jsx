import { useMemo, useState } from "react"
import { ArrowRight, Copy, Link2, Plus } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"
import {
  carrierPartnersMock,
  contractorInviteTemplate,
  contractorPartnersMock,
} from "@/constants/partners-mock"

const statusStyles = {
  Ativo: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Pendente de Aceite": "border-amber-200 bg-amber-50 text-amber-700",
  Encerrado: "border-slate-200 bg-slate-100 text-slate-600",
}

function PartnerCard({ partner, isCarrierView }) {
  const statusClassName = statusStyles[partner.status] || "border-slate-200 bg-slate-50 text-slate-600"

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white">
      <div className="flex h-[52px] items-center justify-between gap-3 rounded-t-xl border-b border-slate-100 bg-slate-50/50 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">
            {partner.logoLetter}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">{partner.name}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{partner.id}</p>
          </div>
        </div>

        <Badge variant="outline" className={`border text-[10px] font-bold uppercase tracking-wider ${statusClassName}`}>
          {partner.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4">
        {isCarrierView ? (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ofertas abertas</p>
              <p className="mt-1 text-lg font-black text-slate-900">{partner.openOffers}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corredores ativos</p>
              <p className="mt-1 text-lg font-black text-slate-900">{partner.currentLanes}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veículos prontos</p>
              <p className="mt-1 text-lg font-black text-slate-900">{partner.fleetReady}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corredores cobertos</p>
              <p className="mt-1 text-lg font-black text-slate-900">{partner.lanesCovered}</p>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-slate-100 bg-white p-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {isCarrierView ? "Código de conexão" : "Última interação"}
          </p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            {isCarrierView ? partner.inviteCode : partner.lastFreight}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {isCarrierView ? "Use esse código para validar o convite recebido." : partner.avgResponseTime}
          </p>
        </div>

        <div className="mt-auto pt-1">
          {isCarrierView ? (
            <Button asChild className="h-9 w-full bg-slate-900 text-xs font-bold text-white hover:bg-slate-800">
              <Link to={`/freights-mural?partner=${encodeURIComponent(partner.name)}`}>
                Ver Ofertas Disponíveis <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" className="h-9 w-full border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50">
              <Link2 size={14} className="mr-1.5" /> Gerar Novo Convite
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default function PartnerNetwork() {
  const { user } = useAuth()
  const isCarrierView = user.role === ROLES.CARRIER
  const [connectionValue, setConnectionValue] = useState("")
  const searchTerm = ""

  const partners = isCarrierView ? carrierPartnersMock : contractorPartnersMock
  const filteredPartners = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return partners
    }

    return partners.filter((partner) => [partner.name, partner.id, partner.status].join(" ").toLowerCase().includes(term))
  }, [partners, searchTerm])

  return (
    <AppShell title="Rede de Parceiros">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl flex-col gap-5 overflow-hidden">
        <div className="grid shrink-0 gap-4 lg:grid-cols-[1.5fr_1fr]">

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            {isCarrierView ? (
              <>
                <div className="flex items-center gap-2">
                  <Plus size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Conectar-se a um novo embarcador</h2>
                </div>
                <div className="mt-4 flex gap-2">
                  <Input
                    value={connectionValue}
                    onChange={(event) => setConnectionValue(event.target.value)}
                    placeholder="Ex: https://sigloc.app/invite/SIG-4821"
                    className="h-10 border-slate-200 text-sm"
                  />
                  <Button className="h-10 bg-blue-600 text-xs font-bold text-white hover:bg-blue-700">Validar</Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Link2 size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Convite inteligente</h2>
                </div>
                <div className="mt-4 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Convite ativo</p>
                  <p className="text-sm font-bold text-slate-900">{contractorInviteTemplate.link}</p>
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>Código: <span className="font-mono font-bold text-slate-700">{contractorInviteTemplate.code}</span></span>
                    <span>{contractorInviteTemplate.expiresAt}</span>
                  </div>
                  <Button variant="outline" className="mt-1 h-9 w-full border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50">
                    <Copy size={14} className="mr-1.5" /> Copiar Link de Convite
                  </Button>
                </div>
              </>
            )}
          </section>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="grid gap-4 overflow-y-auto pr-2 pb-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} isCarrierView={isCarrierView} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}