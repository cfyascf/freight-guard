import { useMemo, useState } from "react"
import { ArrowRight, Building2, Copy, Link2, Network, Plus, Search, ShieldCheck, Unplug, Users } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { ROLES } from "@/constants/roles"
import {
  carrierInviteInboxMock,
  carrierPartnersMock,
  contractorInviteTemplate,
  contractorPartnersMock,
} from "@/constants/partners-mock"

const statusStyles = {
  Ativo: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Pendente de Aceite": "border-amber-200 bg-amber-50 text-amber-700",
  Encerrado: "border-slate-200 bg-slate-100 text-slate-600",
}

function PartnerStatCard({ icon: Icon, label, value, support }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">{support}</p>
        </div>
        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
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
  const [searchTerm, setSearchTerm] = useState("")
  const [connectionValue, setConnectionValue] = useState("")
  const [inviteInbox, setInviteInbox] = useState(carrierInviteInboxMock)

  const partners = isCarrierView ? carrierPartnersMock : contractorPartnersMock
  const filteredPartners = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return partners
    }

    return partners.filter((partner) => [partner.name, partner.id, partner.status].join(" ").toLowerCase().includes(term))
  }, [partners, searchTerm])

  const summary = useMemo(() => {
    const activeCount = partners.filter((partner) => partner.status === "Ativo").length
    const pendingCount = partners.filter((partner) => partner.status === "Pendente de Aceite").length

    if (isCarrierView) {
      return [
        { label: "Embarcadores conectados", value: partners.length, support: `${activeCount} ativos`, icon: Network },
        { label: "Convites aguardando", value: pendingCount, support: "prontos para aceite", icon: ShieldCheck },
        { label: "Ofertas rastreadas", value: partners.reduce((sum, partner) => sum + partner.openOffers, 0), support: "visíveis na rede", icon: Building2 },
      ]
    }

    return [
      { label: "Transportadoras parceiras", value: partners.length, support: `${activeCount} operando`, icon: Users },
      { label: "Pendências de aceite", value: pendingCount, support: "aguardando confirmação", icon: ShieldCheck },
      { label: "Capacidade conectada", value: partners.reduce((sum, partner) => sum + partner.fleetReady, 0), support: "veículos mapeados", icon: Network },
    ]
  }, [isCarrierView, partners])

  const acceptInvite = (inviteId) => {
    setInviteInbox((current) => current.filter((invite) => invite.id !== inviteId))
  }

  return (
    <AppShell title="Rede de Parceiros">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-7xl flex-col gap-5 overflow-hidden">
        <div className="grid gap-3 md:grid-cols-3">
          {summary.map((item) => (
            <PartnerStatCard key={item.label} {...item} />
          ))}
        </div>

        <div className="grid shrink-0 gap-4 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Painel operacional</p>
                <h1 className="mt-2 text-xl font-black tracking-tight text-slate-900">Rede de Parceiros</h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  {isCarrierView
                    ? "Gerencie os embarcadores conectados, aceite convites inteligentes e navegue direto para as ofertas liberadas para sua transportadora."
                    : "Acompanhe as transportadoras vinculadas, gere convites exclusivos e expanda sua rede sem depender de onboarding manual."}
                </p>
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={isCarrierView ? "Buscar por embarcador ou status" : "Buscar por transportadora ou status"}
                  className="h-10 border-slate-200 bg-white pl-9 text-sm"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            {isCarrierView ? (
              <>
                <div className="flex items-center gap-2">
                  <Plus size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Conectar-se a um novo embarcador</h2>
                </div>
                <p className="mt-3 text-sm text-slate-500">Cole o link exclusivo ou digite o código enviado pela contratante para criar o elo.</p>
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
                <p className="mt-3 text-sm text-slate-500">Gere um link único, envie para a transportadora e deixe o aceite acontecer no primeiro login.</p>
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

        {isCarrierView && inviteInbox.length > 0 ? (
          <section className="shrink-0 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Discovery automático</p>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {inviteInbox.map((invite) => (
                <div key={invite.id} className="rounded-lg border border-amber-200 bg-white p-4">
                  <p className="text-sm font-bold text-slate-900">{invite.contractor} deseja estabelecer uma parceria com você.</p>
                  <p className="mt-1 text-xs text-slate-500">Contato: {invite.contact} · Corredor inicial: {invite.corridor}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button className="h-9 bg-slate-900 text-xs font-bold text-white hover:bg-slate-800" onClick={() => acceptInvite(invite.id)}>
                      Aceitar convite
                    </Button>
                    <Button variant="outline" className="h-9 border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50">
                      <Unplug size={14} className="mr-1.5" /> Recusar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="grid h-full gap-4 overflow-y-auto pr-2 pb-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} isCarrierView={isCarrierView} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}