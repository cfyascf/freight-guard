import { useState } from "react"
import { ArrowLeft, PackageOpen, Truck, MapPinned, CalendarClock, DollarSign, Scale, Box, Save, X, Plus, Search } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { productOptionsMock } from "@/constants/products-mock"

export default function CreateSegment() {
  const navigate = useNavigate()
  const [selectedProduct, setSelectedProduct] = useState("")
  const [productSearch, setProductSearch] = useState("")
  const selectedProductOption = productOptionsMock.find((product) => product.value === selectedProduct)
  const filteredProductOptions = productOptionsMock.filter((product) => {
    const search = productSearch.trim().toLowerCase()

    if (!search) return true

    return [product.sku, product.name, product.details]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(search))
  })

  return (
    <AppShell title="Cadastro de Trecho">
      {/* MUDANÇA: Ajuste no calc() para 8.5rem garantindo margem de segurança */}
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        
        {/* HEADER LIMPO E TEXTUAL (Com shrink-0 e mb-5 para isolar o layout) */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 pt-1 mb-5">
          <Link to="/load-management">
            <Button variant="ghost" className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900">
              <ArrowLeft size={16} className="mr-2" /> Voltar para Gestão de Trechos
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-9 border-slate-200 text-xs font-semibold text-slate-700 bg-white">
              <Link to="/load-management"><X size={14} className="mr-1.5" /> Cancelar</Link>
            </Button>
            <Button className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Save size={14} className="mr-1.5" /> Salvar Trecho Operacional
            </Button>
          </div>
        </div>

        {/* MUDANÇA: Double Div (Container Blindado do Formulário) */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
          
            {/* O segredo do alinhamento: grid-rows-[auto_1fr] obriga as caixas a andarem em pares */}
            <div className="grid min-h-full gap-6 md:grid-cols-2 md:grid-rows-[auto_1fr]">
              
              {/* ========================================================
                  LINHA 1: ESPECIFICAÇÕES (Esq) + ITINERÁRIO (Dir)
                  ======================================================== */}
              
              {/* Bloco 1: Identificação da Mercadoria (Esquerda, Topo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                {/* Header travado em h-[52px] */}
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Especificações da Carga</h2>
                </div>
                
                <div className="flex flex-col p-5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Produto Principal</label>
                    <Select
                      value={selectedProduct}
                      onValueChange={(value) => {
                        setSelectedProduct(value)
                        setProductSearch("")
                      }}
                    >
                      <SelectTrigger className="h-10 w-full border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500">
                        {selectedProductOption ? (
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                              {selectedProductOption.sku}
                            </span>
                            <span className="truncate text-sm font-medium text-slate-700">{selectedProductOption.name}</span>
                          </div>
                        ) : (
                          <SelectValue placeholder="Selecione um produto existente..." />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-2 py-2 backdrop-blur-sm">
                          <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                              value={productSearch}
                              onChange={(event) => setProductSearch(event.target.value)}
                              onKeyDown={(event) => event.stopPropagation()}
                              placeholder="Buscar por codigo ou nome..."
                              className="h-9 border-slate-200 bg-slate-50 pl-9 text-xs focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        {filteredProductOptions.length === 0 ? (
                          <div className="px-3 py-3 text-xs text-slate-500">Nenhum produto encontrado.</div>
                        ) : filteredProductOptions.map((product) => (
                          <SelectItem key={product.id} value={product.value}>
                            <div className="flex min-w-0 flex-col gap-0.5 py-0.5">
                              <div className="flex items-center gap-2">
                                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                  {product.sku}
                                </span>
                                <span className="truncate font-semibold text-slate-800">{product.name}</span>
                              </div>
                              <span className="pl-[3.4rem] text-[11px] text-slate-500">{product.details}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-200 bg-slate-50/70 px-3 py-2.5">
                    <p className="text-[11px] font-medium text-slate-500">Nao encontrou o produto na lista?</p>
                    <Button type="button" variant="outline" size="sm" onClick={() => navigate("/create-product")} className="h-8 border-slate-200 bg-white text-[11px] font-semibold text-slate-700 hover:bg-slate-100">
                      <Plus size={13} className="mr-1.5" /> Cadastrar produto
                    </Button>
                  </div>
                  
                </div>
              </div>

              {/* Bloco 3: Malha Logística (Direita, Topo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                {/* Header travado em h-[52px] */}
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <MapPinned size={16} className="text-emerald-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Itinerário Físico</h2>
                </div>
                
                <div className="flex flex-col p-5">
                  <div className="relative space-y-4">
                    <div className="absolute bottom-5 left-3.5 top-8 w-px border-l-2 border-dashed border-slate-200" />
                    
                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-slate-800" />
                      <label className="text-xs font-bold text-slate-600">Local de Coleta (Origem)</label>
                      <Input placeholder="Ex: Curitiba, PR" className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>

                    <div className="relative space-y-2 pl-8">
                      <span className="absolute left-1.5 top-2.5 h-4 w-4 rounded-full border-[3px] border-white bg-emerald-500" />
                      <label className="text-xs font-bold text-slate-600">Local de Entrega (Destino)</label>
                      <Input placeholder="Ex: São Paulo, SP" className="h-10 border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================
                  LINHA 2: CUBAGEM (Esq) + PRAZOS E META (Dir)
                  ======================================================== */}

              {/* Bloco 2: Dimensionamento e Restrição (Esquerda, Baixo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                {/* Header travado em h-[52px] */}
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <Truck size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Cubagem e Veículo Exigido</h2>
                </div>
                
                <div className="flex flex-1 flex-col p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Scale size={13} className="text-slate-400" /> Peso Total
                      </label>
                      <div className="relative">
                        <Input type="number" placeholder="0" className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">kg</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Box size={13} className="text-slate-400" /> Volume
                      </label>
                      <div className="relative">
                        <Input type="number" placeholder="0" className="h-10 border-slate-200 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500" />
                        <span className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">m³</span>
                      </div>
                    </div>
                  </div>

                  {/* MT-AUTO espelhado: Força a Restrição de Equipamento pro exato fundo da caixa */}
                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Restrição de Equipamento</label>
                      <Select>
                        <SelectTrigger className="h-10 border-slate-200 text-sm focus:ring-blue-500">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nenhuma" className="font-semibold text-slate-900">Nenhuma Restrição (Livre)</SelectItem>
                          <SelectItem value="seca">Carga Seca Padrão</SelectItem>
                          <SelectItem value="sider">Baú Sider (Abertura Lateral)</SelectItem>
                          <SelectItem value="frigorifico">Baú Frigorífico / Refrigerado</SelectItem>
                          <SelectItem value="prancha">Carreta Prancha / Aberta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco 4: SLA e Balizamento Financeiro (Direita, Baixo) */}
              <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
                {/* Header travado em h-[52px] */}
                <div className="flex h-[52px] items-center gap-2 border-b border-slate-100 bg-slate-50/50 px-5 rounded-t-xl">
                  <CalendarClock size={16} className="text-amber-600" />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">Prazos e Meta Comercial</h2>
                </div>
                
                <div className="flex flex-1 flex-col p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Coleta Limite (Deadline)</label>
                      <Input type="datetime-local" className="h-10 border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Entrega Limite (Deadline)</label>
                      <Input type="datetime-local" className="h-10 border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                  </div>

                  {/* MT-AUTO espelhado: Força o Orçamento Teto pro exato fundo da caixa */}
                  <div className="mt-auto border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <DollarSign size={14} className="text-emerald-500" /> Orçamento Teto (Valor Guia)
                        </label>
                        <p className="text-[10px] font-medium text-slate-400">O piso legal (ANTT) será calculado depois.</p>
                      </div>
                      
                      <div className="relative w-40">
                        <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">R$</span>
                        <Input type="number" placeholder="0,00" className="h-10 border-slate-200 pl-9 text-sm font-semibold text-slate-800 focus:border-blue-500 focus:ring-blue-500" />
                      </div>
                    </div>
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