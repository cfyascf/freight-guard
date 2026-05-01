import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"

export default function LoadManagement() {
  const cargasMock = [
    {
      id: "CRG-1042",
      rota: "Curitiba, PR → São Paulo, SP",
      peso: "12 Ton",
      volume: "45 m³",
      status: "Disponível",
      requisitos: ["Refrigerado", "Alimentício"] 
    },
    {
      id: "CRG-1043",
      rota: "Joinville, SC → Campinas, SP",
      peso: "1.5 Ton",
      volume: "10 m³",
      status: "Em Leilão",
      requisitos: ["Frágil", "Express"]
    },
    {
      id: "CRG-1044",
      rota: "Ponta Grossa, PR → Santos, SP",
      peso: "28 Ton",
      volume: "60 m³",
      status: "Alocada",
      requisitos: ["Grãos", "Carga Seca"]
    },
    {
      id: "CRG-1045",
      rota: "Araucária, PR → Rio de Janeiro, RJ",
      peso: "8 Ton",
      volume: "25 m³",
      status: "Disponível",
      requisitos: ["Produto Químico", "Inflamável"]
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponível': return 'bg-emerald-100 text-emerald-800';
      case 'Em Leilão': return 'bg-blue-100 text-blue-800';
      case 'Alocada': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  return (
    <AppShell
      title="Gestao de Cargas"
      actions={
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 md:w-auto">
          <Plus size={16} className="mr-2" /> Nova Carga
        </Button>
      }
    >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  type="text" 
                  placeholder="Buscar por ID, Rota ou Status..." 
                  className="pl-9 bg-white border-slate-200"
                />
              </div>
              <Button variant="outline" className="bg-white border-slate-200">
                <Filter size={16} className="mr-2" /> Filtros
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[120px]">ID Carga</TableHead>
                  <TableHead>Origem → Destino</TableHead>
                  <TableHead>Dimensões</TableHead>
                  <TableHead>Requisitos Específicos (JSONB)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargasMock.map((carga) => (
                  <TableRow key={carga.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium text-slate-900">{carga.id}</TableCell>
                    <TableCell className="text-slate-600">{carga.rota}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-800">{carga.peso}</span>
                        <span className="text-xs text-slate-500">{carga.volume}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {carga.requisitos.map((req, index) => (
                          <Badge key={index} variant="secondary" className="bg-slate-100 text-slate-600 font-normal hover:bg-slate-200">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`font-medium border-none ${getStatusColor(carga.status)}`}>
                        {carga.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
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