import { Clock, Layers, TrendingUp, Truck } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const kpis = [
  {
    title: "Trechos Avulsos",
    value: "14",
    helper: "Aguardando composição de rota",
    icon: Layers,
    tone: "amber",
  },
  {
    title: "Leilões Próximos ao Fim",
    value: "3",
    helper: "Encerramento nas próximas 2 horas",
    icon: Clock,
    tone: "rose",
  },
  {
    title: "Rotas em Trânsito",
    value: "8",
    helper: "Monitoramento de execução ativo",
    icon: Truck,
    tone: "sky",
  },
  {
    title: "Economia Gerada (Mês)",
    value: "R$ 18.450",
    helper: "Redução via Continuous Move",
    icon: TrendingUp,
    tone: "emerald",
  },
]

const efficiencyBars = [
  { label: "Curitiba → SP", avulso: 92, consolidado: 64 },
  { label: "SP → Campinas", avulso: 76, consolidado: 48 },
  { label: "Campinas → RJ", avulso: 88, consolidado: 56 },
  { label: "Sul → Sudeste", avulso: 97, consolidado: 58 },
]

const slaAlerts = [
  {
    risk: "CRÍTICO",
    segmentId: "TRC-1042",
    route: "Curitiba ➔ São Paulo",
    timeRemaining: "Coleta limite em 45 min",
  },
  {
    risk: "CRÍTICO",
    segmentId: "TRC-1045",
    route: "Ribeirão Preto ➔ Uberlândia",
    timeRemaining: "Coleta limite em 1h 10 min",
  },
  {
    risk: "ATENÇÃO",
    segmentId: "TRC-1043",
    route: "São Paulo ➔ Campinas",
    timeRemaining: "Coleta limite em 2h 20 min",
  },
]

const getKpiToneClass = (tone) => {
  switch (tone) {
    case "amber":
      return {
        icon: "bg-amber-50 text-amber-700",
        border: "border-amber-100",
      }
    case "rose":
      return {
        icon: "bg-rose-50 text-rose-700",
        border: "border-rose-100",
      }
    case "emerald":
      return {
        icon: "bg-emerald-50 text-emerald-700",
        border: "border-emerald-100",
      }
    default:
      return {
        icon: "bg-sky-50 text-sky-700",
        border: "border-sky-100",
      }
  }
}

const getAlertClasses = (risk) => {
  if (risk === "CRÍTICO") {
    return {
      container: "border-l-4 border-l-rose-600 bg-rose-50/50",
      badge: "bg-rose-100 text-rose-800 hover:bg-rose-100",
      time: "text-rose-700",
    }
  }

  return {
    container: "border-l-4 border-l-amber-500 bg-amber-50/40",
    badge: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    time: "text-amber-700",
  }
}

export default function Dashboard() {
  return (
    <AppShell title="Torre de Controle Operacional">
      <div className="mx-auto max-w-7xl space-y-6 bg-slate-50/70">
        <div className="space-y-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Torre de Controle Operacional</h1>
          <p className="text-sm text-slate-600">
            Consolidado diário para o planejador logístico priorizar composição, acompanhar leilões críticos e comprovar a eficiência das rotas estruturadas.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            const tone = getKpiToneClass(kpi.tone)

            return (
              <Card key={kpi.title} className={`border ${tone.border} bg-white shadow-sm`}>
                <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-3">
                  <div>
                    <CardTitle className="text-sm font-medium text-slate-500">{kpi.title}</CardTitle>
                  </div>
                  <div className={`rounded-2xl p-2.5 ${tone.icon}`}>
                    <Icon size={18} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold tracking-tight text-slate-900">{kpi.value}</div>
                  <p className="mt-2 text-sm text-slate-500">{kpi.helper}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Painel de Eficiência</CardTitle>
              <CardDescription>
                Comparativo visual entre o custo de fretes avulsos e o custo de rotas consolidadas em corredores de maior recorrência.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tese operacional</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Em todos os fluxos monitorados, a rota consolidada reduz custo unitário e melhora previsibilidade de execução.
                  </p>
                </div>
                <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Média avulso</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">R$ 9.420</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Média consolidado</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-700">R$ 6.110</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {efficiencyBars.map((row) => (
                  <div key={row.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{row.label}</span>
                      <span className="text-xs text-slate-400">redução média de {Math.round(((row.avulso - row.consolidado) / row.avulso) * 100)}%</span>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-28 text-xs font-medium text-slate-500">Frete avulso</span>
                        <div className="h-3 flex-1 rounded-full bg-slate-100">
                          <div className="h-3 rounded-full bg-slate-500" style={{ width: `${row.avulso}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-28 text-xs font-medium text-slate-500">Rota consolidada</span>
                        <div className="h-3 flex-1 rounded-full bg-emerald-50">
                          <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${row.consolidado}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg font-semibold text-slate-900">Alertas de SLA (Janelas Críticas)</CardTitle>
              <CardDescription>
                Trechos que exigem decisão rápida para evitar perda de coleta, quebra de janela ou impacto direto no planejamento do dia.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              {slaAlerts.map((alert) => {
                const styles = getAlertClasses(alert.risk)

                return (
                  <div key={alert.segmentId} className={`rounded-2xl border border-slate-200 p-4 ${styles.container}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`border-none ${styles.badge}`}>{alert.risk}</Badge>
                          <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                            {alert.segmentId}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{alert.route}</p>
                      </div>
                    </div>
                    <p className={`mt-3 text-sm font-medium ${styles.time}`}>{alert.timeRemaining}</p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  )
}