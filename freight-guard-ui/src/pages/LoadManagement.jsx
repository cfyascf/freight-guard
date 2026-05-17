import { Filter, Plus, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RISK } from "@/constants/risk"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"

export default function LoadManagement() {
  const navigate = useNavigate()

  const cargasMock = [
    {
      id: "CRG-1042",
      rota: "Curitiba, PR → São Paulo, SP",
      janelaColeta: "18/05/2026 08:00 - 10:00",
      transportadora: "TransLog Sul",
      valorFrete: 4800,
      risk: RISK.NORMAL,
      status: "Disponível",
    },
    {
      id: "CRG-1043",
      rota: "Joinville, SC → Campinas, SP",
      janelaColeta: "18/05/2026 11:00 - 13:30",
      transportadora: "Aguardando definição",
      valorFrete: 5350,
      risk: RISK.WARNING,
      status: "Em Leilão",
    },
    {
      id: "CRG-1044",
      rota: "Ponta Grossa, PR → Santos, SP",
      janelaColeta: "19/05/2026 07:30 - 09:00",
      transportadora: "RodoMax Cargo",
      valorFrete: 7250,
      risk: RISK.CRITIC,
      status: "Alocada",
    },
    {
      id: "CRG-1045",
      rota: "Araucária, PR → Rio de Janeiro, RJ",
      janelaColeta: "19/05/2026 14:00 - 16:00",
      transportadora: "Aguardando definição",
      valorFrete: 6100,
      risk: RISK.WARNING,
      status: "Disponível",
    }
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const getTransportadoraLabel = (carga) => {
    return carga.status === "Alocada" ? carga.transportadora : "Em Leilão"
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Disponível': return 'bg-emerald-100 text-emerald-800';
      case 'Em Leilão': return 'bg-blue-100 text-blue-800';
      case 'Alocada': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  const getRiskBorderClass = (risk) => {
    switch (risk) {
      case RISK.NORMAL:
        return "border-l-4 border-l-emerald-500"
      case RISK.WARNING:
        return "border-l-4 border-l-amber-500"
      case RISK.CRITIC:
        return "border-l-4 border-l-rose-600"
      default:
        return "border-l-4 border-l-slate-200"
    }
  }

  const getRiskBadgeClass = (risk) => {
    switch (risk) {
      case RISK.NORMAL:
        return "bg-emerald-100 text-emerald-800"
      case RISK.WARNING:
        return "bg-amber-100 text-amber-800"
      case RISK.CRITIC:
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <AppShell title="Gestao de Cargas">
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
              <Button asChild variant="outline" className="bg-white border-slate-200">
                <Link to="/product-management">
                  <Filter size={16} className="mr-2" /> Filtros
                </Link>
              </Button>
              <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                <Link to="/create-load">
                  <Plus size={16} className="mr-2" /> Nova Carga
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[120px]">ID Carga</TableHead>
                  <TableHead>Origem → Destino</TableHead>
                  <TableHead>Janela de Coleta</TableHead>
                  <TableHead>Transportadora</TableHead>
                  <TableHead>Valor do Frete</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargasMock.map((carga) => (
                  <TableRow
                    key={carga.id}
                    className="cursor-pointer hover:bg-slate-50/50"
                    tabIndex={0}
                    role="link"
                    onClick={() => navigate(`/load-details/${carga.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        navigate(`/load-details/${carga.id}`)
                      }
                    }}
                  >
                    <TableCell className={`font-medium text-slate-900 ${getRiskBorderClass(carga.risk)}`}>
                      <div className="flex flex-col gap-1">
                        <span>{carga.id}</span>
                        <Badge className={`w-fit border-none text-[10px] font-bold uppercase tracking-wide ${getRiskBadgeClass(carga.risk)}`}>
                          {carga.risk}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{carga.rota}</TableCell>
                    <TableCell className="text-slate-700">{carga.janelaColeta}</TableCell>
                    <TableCell className="text-slate-700">{getTransportadoraLabel(carga)}</TableCell>
                    <TableCell className="font-medium text-emerald-700">{formatCurrency(carga.valorFrete)}</TableCell>
                    <TableCell>
                      <Badge className={`font-medium border-none ${getStatusColor(carga.status)}`}>
                        {carga.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

    </AppShell>
  )
}