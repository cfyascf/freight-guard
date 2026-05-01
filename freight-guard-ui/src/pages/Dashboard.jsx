import { Shield, ChartBar, MapPin, Box, Gavel, User, Bell, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3 text-white">
            <Shield size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            Freight<span className="text-blue-600">Guard</span>
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Menu Principal</p>
          <a href="#" className="flex items-center px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
            <ChartBar size={18} className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
            <MapPin size={18} className="mr-3" /> Gestao de Rotas
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
            <Box size={18} className="mr-3" /> Gestao de Cargas
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
            <Gavel size={18} className="mr-3" /> Painel de Leilao
          </a>
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center border border-slate-300 text-slate-500">
              <User size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-700">Yasmim</p>
              <p className="text-xs text-slate-500">Visao: Contratante</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-semibold text-slate-800">Dashboard Executivo</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white">
              + Nova Carga
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500">Cargas em Transito</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Truck size={20} /></div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">84</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span> 100% no prazo
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -z-10"></div>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500">Overbookings Bloqueados</CardTitle>
                <div className="p-2 bg-red-50 rounded-lg text-red-600"><Shield size={20} /></div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">12</div>
                <p className="text-xs text-red-600 mt-1 font-medium">Prevencao de falha de SLA nesta semana</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500">Otimizacao de Volume</CardTitle>
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Box size={20} /></div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">92%</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">Aproveitamento cubico medio</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
                <CardTitle className="text-base font-semibold text-slate-800">Status dos Leiloes</CardTitle>
                <Button variant="link" className="text-blue-600">Ver todas</Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Remessa / Rota</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Lances</TableHead>
                      <TableHead>Status do Motor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <p className="font-semibold text-slate-900">#CRG-882</p>
                        <p className="text-xs text-slate-500">Curitiba, PR - Sao Paulo, SP</p>
                      </TableCell>
                      <TableCell className="text-sm">12 Ton - 45m3</TableCell>
                      <TableCell><Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">3 Lances</Badge></TableCell>
                      <TableCell className="text-emerald-600 font-medium text-sm">Aguardando Aceite</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p className="font-semibold text-slate-900">#CRG-883</p>
                        <p className="text-xs text-slate-500">Joinville, SC - Campinas, SP</p>
                      </TableCell>
                      <TableCell className="text-sm">1.5 Ton - 10m3</TableCell>
                      <TableCell><Badge variant="outline" className="text-slate-600">Sem lances</Badge></TableCell>
                      <TableCell className="text-slate-500 text-sm">No mercado</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-base font-semibold text-slate-800">Auditoria de Restricoes</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Bloqueio de ETA Acionado</p>
                    <p className="text-xs text-slate-500 mt-0.5">Veiculo ABC-1234 tentou alocacao simultanea.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}