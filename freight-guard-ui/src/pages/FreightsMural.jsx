import { useState } from "react"
import { AlertCircle, Box, CheckCircle2, MapPin, Search, ShieldAlert, Truck, Calendar, Clock, Package } from "lucide-react"
import { useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FreightsMural() {
  // Estados para controlar o Modal único
  const [freteSelecionado, setFreteSelecionado] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  // Lista estática de dados
  const ofertasDisponiveis = [
    {
      id: "OFT-9921",
      contratante: "Volvo Cars do Brasil",
      nomeCarga: "Peças Automotivas",
      tipoCarga: "Manufaturados",
      rota: "Curitiba, PR → São Paulo, SP",
      tempoRetirada: "03/05/2026 08:00",
      previsaoChegada: "04/05/2026 12:00",
      distancia: "408 km",
      valor: 2500.00,
      peso: "12 Ton",
      volume: "45 m³",
      requisitos: ["Refrigerado"],
      urgencia: "Alta",
      caminhoesDisponiveis: 2
    },
    {
      id: "OFT-9924",
      contratante: "Industrias Alpha",
      nomeCarga: "Bobinas de Aço",
      tipoCarga: "Pesada / Siderurgia",
      rota: "Ponta Grossa, PR → Joinville, SC",
      tempoRetirada: "05/05/2026 06:00",
      previsaoChegada: "05/05/2026 18:00",
      distancia: "215 km",
      valor: 1600.00,
      peso: "28 Ton",
      volume: "60 m³",
      requisitos: ["Carga Seca"],
      urgencia: "Normal",
      caminhoesDisponiveis: 0
    },
    {
      id: "OFT-9925",
      contratante: "TechLogistics",
      nomeCarga: "Lote de Servidores",
      tipoCarga: "Eletrônicos Sensíveis",
      rota: "Araucária, PR → Rio de Janeiro, RJ",
      tempoRetirada: "04/05/2026 14:00",
      previsaoChegada: "06/05/2026 09:00",
      distancia: "850 km",
      valor: 4200.00,
      peso: "8 Ton",
      volume: "25 m³",
      requisitos: ["Produto Químico"],
      urgencia: "Normal",
      caminhoesDisponiveis: 5
    }
  ]

  const minhaFrota = [
    { placa: "ABC-1234", modelo: "Volvo FH 460", status: "Livre", capacidade: "50 m³" },
    { placa: "XYZ-9876", modelo: "Volvo VM 270", status: "Em Trânsito", capacidade: "30 m³" }
  ]

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  // Função para abrir o modal de forma limpa
  const abrirModalLance = (oferta) => {
    setFreteSelecionado(oferta)
    setIsModalOpen(true)
  }

  return (
    <AppShell title="Mural de Oportunidades (Marketplace)">
      
      {/* Barra de Busca */}
      <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="text" 
            placeholder="Buscar por origem, destino ou contratante..." 
            className="border-slate-200 bg-white pl-9 shadow-sm"
          />
        </div>
      </div>

      {/* Grid de Ofertas - Renderização Dinâmica e Enxuta */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {ofertasDisponiveis.map((oferta) => (
          <Card key={oferta.id} className="flex flex-col border-slate-200 transition-shadow hover:shadow-md">
            
            <CardHeader className="border-b border-slate-50 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {oferta.contratante}
                  </p>
                  <CardTitle className="text-lg font-bold text-slate-800">
                    {formatarMoeda(oferta.valor)}
                  </CardTitle>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {oferta.urgencia === "Alta" && (
                    <Badge variant="destructive" className="bg-red-50 text-red-600 border-none hover:bg-red-100">
                      Urgente ⚠
                    </Badge>
                  )}
                  <Badge variant="outline" className={oferta.caminhoesDisponiveis > 0 ? "text-slate-600 bg-slate-50" : "text-red-600 bg-red-50 border-red-200"}>
                    {oferta.caminhoesDisponiveis} {oferta.caminhoesDisponiveis === 1 ? 'veículo' : 'veículos'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 pt-4">
              <div className="space-y-4 text-sm">
                
                <div>
                  <p className="font-semibold text-slate-800 text-base">{oferta.nomeCarga}</p>
                  <div className="flex items-center text-slate-500 mt-1">
                    <Package size={14} className="mr-1.5" />
                    <span>{oferta.tipoCarga}</span>
                  </div>
                </div>

                <div className="flex items-start rounded-md bg-slate-50 p-2">
                  <MapPin size={16} className="mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-700">{oferta.rota}</p>
                    <p className="text-xs text-slate-500">{oferta.distancia} de distância</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 flex items-center"><Clock size={12} className="mr-1" /> Retirar até</span>
                    <span className="font-medium text-slate-700">{oferta.tempoRetirada}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 flex items-center"><Calendar size={12} className="mr-1" /> Chegada Prev.</span>
                    <span className="font-medium text-slate-700">{oferta.previsaoChegada}</span>
                  </div>
                </div>

                <div className="flex items-start border-t border-slate-100 pt-3">
                  <Box size={16} className="mr-2 mt-0.5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-700">{oferta.peso} • {oferta.volume}</p>
                    <div className="mt-1 flex gap-1 flex-wrap">
                      {oferta.requisitos.map(req => (
                        <Badge key={req} variant="secondary" className="bg-slate-100 text-[10px] font-normal text-slate-600">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </CardContent>

            <CardFooter className="bg-slate-50/50 pt-4 rounded-b-xl border-t border-slate-50">
              {oferta.caminhoesDisponiveis === 0 ? (
                <Button disabled className="w-full bg-slate-200 text-slate-500 cursor-not-allowed">
                  <Truck size={16} className="mr-2" />
                  Sem frota disponível
                </Button>
              ) : (
                <Button 
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  onClick={() => abrirModalLance(oferta)}
                >
                  Dar lance ✓
                </Button>
              )}
            </CardFooter>
            
          </Card>
        ))}
      </div>

      {/* Modal Único no escopo global do AppShell */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShieldAlert size={18} className="mr-2 text-blue-600" />
              Motor de Validação
            </DialogTitle>
            <DialogDescription>
              Selecione o veículo para a rota <strong>{freteSelecionado?.rota.split(' → ')[1]}</strong>. O sistema validará a disponibilidade (ETA) e o volume.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Selecione o Caminhão (Placa)</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um veículo da frota..." />
                </SelectTrigger>
                <SelectContent>
                  {minhaFrota.map((veiculo) => (
                    <SelectItem key={veiculo.placa} value={veiculo.placa}>
                      <div className="flex items-center">
                        <Truck size={14} className="mr-2 text-slate-500" />
                        {veiculo.placa} ({veiculo.modelo}) - {veiculo.capacidade}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 flex items-start">
              <AlertCircle size={16} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Ao confirmar, o <strong>FreightGuard</strong> verificará o limite de <strong>{freteSelecionado?.volume}</strong> usando heurísticas e consultará o OpenRouteService para prevenir overbooking.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" className="border-slate-200" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setIsModalOpen(false)
                navigate("/transport-overview")
              }}
            >
              <CheckCircle2 size={16} className="mr-2" />
              Confirmar Alocação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </AppShell>
  )
}