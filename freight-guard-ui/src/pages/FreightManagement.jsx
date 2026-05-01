import { Filter, MoreHorizontal, Plus, Search, Settings2, Truck } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"

export default function FreightManagement() {
  // Simulando a tabela 'Veiculo' do seu banco de dados
  const frotaMock = [
    {
      placa: "ABC-1234",
      modelo: "Volvo FH 540",
      tipo: "Carreta Baú",
      capacidadePeso: "30 Ton",
      capacidadeVolume: "115 m³",
      status: "Livre",
      // O JSONB de atributos do veículo no Postgres!
      atributos: ["Rastreador Satélite", "MOPP"] 
    },
    {
      placa: "XYZ-9876",
      modelo: "Volvo VM 270",
      tipo: "Truck Refrigerado",
      capacidadePeso: "14 Ton",
      capacidadeVolume: "45 m³",
      status: "Em Trânsito",
      atributos: ["Refrigerador Thermoking", "Anvisa"]
    },
    {
      placa: "DEF-5566",
      modelo: "Scania R450",
      tipo: "Sider",
      capacidadePeso: "28 Ton",
      capacidadeVolume: "105 m³",
      status: "Manutenção",
      atributos: ["Suspensão Pneumática"]
    },
    {
      placa: "GHI-3322",
      modelo: "Volvo FH 460",
      tipo: "Carreta Graneleira",
      capacidadePeso: "32 Ton",
      capacidadeVolume: "90 m³",
      status: "Livre",
      atributos: ["Lona Fácil"]
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Livre': return 'bg-emerald-100 text-emerald-800'
      case 'Em Trânsito': return 'bg-blue-100 text-blue-800'
      case 'Manutenção': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <AppShell
      title="Gestão de Frota"
      actions={
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 md:w-auto">
          <Plus size={16} className="mr-2" /> Cadastrar Veículo
        </Button>
      }
    >
      {/* Top Actions Bar */}
      <div className="mb-6 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex w-full items-center space-x-3 md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Buscar por placa ou modelo..." 
              className="border-slate-200 bg-white pl-9"
            />
          </div>
          <Button variant="outline" className="border-slate-200 bg-white">
            <Settings2 size={16} className="mr-2" /> Atributos
          </Button>
        </div>

        {/* Resumo Rápido para a Transportadora */}
        <div className="flex items-center space-x-4 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Livres: 2</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Em Trânsito: 1</div>
          <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Manutenção: 1</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[140px]">Placa / Modelo</TableHead>
              <TableHead>Tipo de Carroceria</TableHead>
              <TableHead>Capacidade Máxima (Limites)</TableHead>
              <TableHead>Atributos Específicos (JSONB)</TableHead>
              <TableHead>Status Operacional</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frotaMock.map((veiculo) => (
              <TableRow key={veiculo.placa} className="hover:bg-slate-50/50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 tracking-wide">{veiculo.placa}</span>
                    <span className="text-xs text-slate-500">{veiculo.modelo}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-700 font-medium">{veiculo.tipo}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {/* Estes são os números que o algoritmo de mochila vai devorar */}
                    <span className="text-sm font-semibold text-slate-800">{veiculo.capacidadePeso}</span>
                    <span className="text-xs font-medium text-blue-600">{veiculo.capacidadeVolume}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {veiculo.atributos.map((atr, index) => (
                      <Badge key={index} variant="outline" className="border-slate-200 text-slate-600 font-normal bg-slate-50">
                        {atr}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`font-medium border-none ${getStatusColor(veiculo.status)}`}>
                    {veiculo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  )
}