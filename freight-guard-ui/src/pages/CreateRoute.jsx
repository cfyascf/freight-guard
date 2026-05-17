import { ArrowLeft, MapPin, Route, Save } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function CreateRoute() {
  return (
    <AppShell title="Cadastro de Nova Rota">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/create-load">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Lançamento de Carga
            </Button>
          </Link>
          <div className="flex space-x-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/create-load">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/create-load">
                <Save size={16} className="mr-2" /> Salvar Rota
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
              <Route size={18} className="mr-2 text-blue-600" /> Dados da Rota
            </CardTitle>
            <CardDescription>
              Cadastre uma nova origem e destino para que a rota fique disponível no lançamento de cargas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Ponto de Origem</p>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <Input placeholder="Ex: Curitiba, PR ou CEP..." className="pl-9 border-slate-200" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Ponto de Destino</p>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-2.5 text-red-400" />
                <Input placeholder="Ex: São Paulo, SP ou CEP..." className="pl-9 border-slate-200" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Tarifa Base Padrão (R$)</p>
              <Input type="number" placeholder="0,00" className="border-slate-200" />
              <p className="text-xs text-slate-500">Valor de referência para geração de leilões.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
