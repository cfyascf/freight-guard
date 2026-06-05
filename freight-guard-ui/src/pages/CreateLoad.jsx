import { ArrowLeft, Boxes, MapPin, Package, Save, Workflow } from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cargoItemsMock, segmentPlansMock } from "@/constants/logistics-mock"
import { productOptionsMock } from "@/constants/products-mock"

export default function CreateLoad() {
  return (
    <AppShell title="Cadastro de Item de Carga">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Link to="/load-management">
            <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Itens de Carga
            </Button>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-slate-200">
              <Link to="/load-management">Cancelar</Link>
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <Link to="/load-management">
                <Save size={16} className="mr-2" /> Salvar Item
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="gap-0 border-slate-200 py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <Package size={18} className="mr-2 text-blue-600" /> Produto e Quantidade
                </CardTitle>
                <CardDescription>
                  Cadastre o item operacional que poderá compor um trecho simples ou consolidado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cargo-product" className="text-sm font-medium text-slate-700">Produto associado</label>
                  <Select>
                    <SelectTrigger id="cargo-product" className="mt-2 border-slate-200 bg-white">
                      <SelectValue placeholder="Selecione um produto cadastrado..." />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptionsMock.map((product) => (
                        <SelectItem key={product.id} value={product.value}>{product.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cargo-quantity" className="text-sm font-medium text-slate-700">Quantidade</label>
                    <Input id="cargo-quantity" placeholder="Ex: 100 kg" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cargo-category" className="text-sm font-medium text-slate-700">Categoria logística</label>
                    <Input id="cargo-category" placeholder="Ex: Perecível refrigerado" className="border-slate-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cargo-weight" className="text-sm font-medium text-slate-700">Peso total</label>
                    <Input id="cargo-weight" placeholder="Ex: 100 kg" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cargo-volume" className="text-sm font-medium text-slate-700">Cubagem</label>
                    <Input id="cargo-volume" placeholder="Ex: 4 m³" className="border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cargo-requirements" className="text-sm font-medium text-slate-700">Requisitos operacionais</label>
                  <Input id="cargo-requirements" placeholder="Ex: Refrigerado, Frágil, Hazmat" className="border-slate-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 border-slate-200 py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                  <MapPin size={18} className="mr-2 text-blue-600" /> Origem e Destino do Item
                </CardTitle>
                <CardDescription>
                  O item pode existir sozinho e depois ser conectado a um trecho maior no planejamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cargo-origin" className="text-sm font-medium text-slate-700">Origem</label>
                    <Input id="cargo-origin" placeholder="Ex: Curitiba, PR" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cargo-destination" className="text-sm font-medium text-slate-700">Destino</label>
                    <Input id="cargo-destination" placeholder="Ex: São Paulo, SP" className="border-slate-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cargo-pickup-window" className="text-sm font-medium text-slate-700">Janela de coleta</label>
                    <Input id="cargo-pickup-window" type="datetime-local" className="border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cargo-delivery-window" className="text-sm font-medium text-slate-700">Janela de entrega</label>
                    <Input id="cargo-delivery-window" type="datetime-local" className="border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cargo-segment" className="text-sm font-medium text-slate-700">Sugerir vínculo com trecho</label>
                  <Select>
                    <SelectTrigger id="cargo-segment" className="border-slate-200 bg-white">
                      <SelectValue placeholder="Selecione um trecho existente ou deixe para depois" />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentPlansMock.map((segment) => (
                        <SelectItem key={segment.id} value={segment.id}>
                          {segment.id} • {segment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="gap-0 border-slate-200 py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                  <Workflow size={18} className="text-blue-600" /> Como o planejador usa isso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <p>1. Cadastra o item com produto, quantidade e janelas operacionais.</p>
                <p>2. Decide depois se ele entra num trecho simples ou consolidado.</p>
                <p>3. Publica o leilão no nível do trecho, não no nível do item.</p>
              </CardContent>
            </Card>

            <Card className="gap-0 border-slate-200 py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
                  <Boxes size={18} className="text-blue-600" /> Exemplos existentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cargoItemsMock.slice(0, 3).map((cargo) => (
                  <div key={cargo.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-800">{cargo.id} • {cargo.productName}</p>
                    <p className="mt-1 text-xs text-slate-500">{cargo.quantityLabel} • {cargo.routeLabel}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
