import { useState } from "react"
import { ArrowLeft, MapPin, RefreshCw, Truck, CheckCircle2, MapPinned } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"

export default function ActiveRouteTracking() {
  const { routeId } = useParams()
  const [isPinging, setIsPinging] = useState(false)
  const [lastPing, setLastPing] = useState("14:20")

  // Simulação de ping (Sob demanda)
  const handlePing = () => {
    setIsPinging(true)
    setTimeout(() => {
      setIsPinging(false)
      setLastPing(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 1500)
  }

  return (
    <AppShell title={`Monitoramento: Rota ${routeId || "ROT-9921"}`}>
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-6xl flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Link to="/active-route-tracking">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Rotas Ativas
            </Button>
          </Link>

          <Button 
            className="h-9 bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700"
            onClick={handlePing}
            disabled={isPinging}
          >
            <RefreshCw size={14} className={`mr-1.5 ${isPinging ? 'animate-spin' : ''}`} />
            {isPinging ? "Localizando..." : "Pingar Motorista"}
          </Button>
        </div>

        {/* CONTAINER DE MONITORAÇÃO */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUNA ESQUERDA: STATUS E OPERAÇÃO (2/3 da largura) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card de Status do SLA */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-50 p-3 rounded-full text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">Operação Dentro do Planejado</h2>
                    <p className="text-xs text-slate-500">Próxima parada em 45km (Curitiba ➔ Joinville)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-slate-400">ETA Estimado</p>
                  <p className="text-sm font-black font-mono text-slate-800">18:30h</p>
                </div>
              </div>

              {/* Timeline da Rota */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-6 flex items-center gap-2">
                    <MapPinned size={14} /> Progresso da Rota
                 </h3>
                 <div className="space-y-6">
                    {/* Exemplo de parada */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                            <div className="h-full w-px bg-slate-200 my-2" />
                        </div>
                        <div className="pb-6">
                            <p className="text-sm font-bold text-slate-800">Curitiba, PR</p>
                            <p className="text-xs text-emerald-600 font-medium">Concluído às 14:00h</p>
                        </div>
                    </div>
                    {/* Parada Ativa */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">Joinville, PR</p>
                            <p className="text-xs text-slate-500">Em trânsito (Previsto 17:30h)</p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* COLUNA DIREITA: DADOS DE CONTROLE (1/3 da largura) */}
            <div className="space-y-6">
              
              {/* Card de Localização (O Ping) */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <MapPin size={16} className="text-rose-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Posição Atual</h2>
                </div>
                <div className="p-5 text-center">
                    <p className="text-sm font-mono font-bold text-slate-800">S25° 25' 40" W49° 16' 23"</p>
                    <p className="text-[11px] text-slate-400 mt-1">Última atualização: {lastPing}</p>
                    <div className="mt-4 p-2 bg-slate-50 rounded border border-slate-100 text-[10px] text-slate-500">
                        Ponto de referência: BR-376, Km 640.
                    </div>
                </div>
              </div>

              {/* Informações do Motorista/Veículo */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                        <Truck size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800">Expresso Frio Ltda</p>
                        <p className="text-[10px] text-slate-500">Placa: ABC-1234</p>
                    </div>
                </div>
                <div className="border-t border-slate-100 pt-4 text-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Motorista:</span>
                        <span className="font-semibold">João Silva</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Telefone:</span>
                        <span className="font-semibold">(41) 99999-8888</span>
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  )
}