import { useState } from "react"
import {
  ArrowLeft,
  Save,
  X,
  PackageOpen,
  AlertTriangle,
  Layers,
  Scale,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CreateProduct() {
  const navigate = useNavigate()

  // Estados para controlar os campos dinâmicos
  const [temperatura, setTemperatura] = useState("Ambiente")
  const [perigosa, setPerigosa] = useState(false)
  const [fragil, setFragil] = useState(false)
  const [empilhavel, setEmpilhavel] = useState(true)
  const [isTemplate, setIsTemplate] = useState(false)
  const [acomodacao, setAcomodacao] = useState("")

  return (
    <AppShell title="Cadastro de Produto">
      <div className="mx-auto flex h-[calc(100vh-8.5rem)] max-w-5xl flex-col overflow-hidden">
        {/* HEADER */}
        <div className="mb-5 flex shrink-0 items-center justify-between border-b border-slate-200 pt-1 pb-3">
          <Link to="/product-management">
            <Button
              variant="ghost"
              className="h-auto p-0 text-sm font-medium text-slate-500 hover:bg-transparent hover:text-slate-900"
            >
              <ArrowLeft size={16} className="mr-2" /> Voltar ao Catálogo
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="h-9 border-slate-200 bg-white text-xs font-semibold text-slate-700"
              onClick={() => navigate("/product-management")}
            >
              <X size={14} className="mr-1.5" /> Cancelar
            </Button>
            <Button className="h-9 bg-blue-600 text-xs font-bold tracking-wide text-white hover:bg-blue-700">
              <Save size={14} className="mr-1.5" /> Salvar Novo Produto
            </Button>
          </div>
        </div>

        {/* CONTAINER COM SCROLL BLINDADO */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 pb-6">
            <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2">
              {/* Bloco: Identificação */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 rounded-t-xl border-b border-slate-100 bg-slate-50/50 px-5">
                  <PackageOpen size={16} className="text-blue-600" />
                  <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Identificação do Produto
                  </h2>
                </div>
                <div className="space-y-4 p-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">
                      Nome do Produto
                    </label>
                    <Input
                      placeholder="Ex: Peito de Frango Congelado"
                      className="h-10 border-slate-200 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">
                        Código
                      </label>
                      <Input
                        placeholder="Ex: FRG-001"
                        className="h-10 border-slate-200 font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">
                        Categoria
                      </label>
                      <Input
                        placeholder="Ex: Congelados"
                        className="h-10 border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco: Dimensões e Acomodação */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <div className="flex h-[52px] items-center gap-2 rounded-t-xl border-b border-slate-100 bg-slate-50/50 px-5">
                  <Scale size={16} className="text-slate-600" />
                  <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Dimensões e Acomodação
                  </h2>
                </div>
                <div className="space-y-4 p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">
                        Peso Base (Kg)
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        className="h-10 border-slate-200 font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">
                        Volume (m³)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0"
                        className="h-10 border-slate-200 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">
                      Formato de Acomodação
                    </label>
                    <Select onValueChange={setAcomodacao} value={acomodacao}>
                      <SelectTrigger className="h-10 border-slate-200 text-sm">
                        <SelectValue placeholder="Selecione o formato..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paletizado">Paletizado</SelectItem>
                        <SelectItem value="caixas">Caixas Master</SelectItem>
                        <SelectItem value="granel">Granel</SelectItem>
                        <SelectItem value="isotermico">Isotérmico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* BLOCO: REGRAS DE RISCO OPERACIONAL */}
              <div className="rounded-xl border border-slate-200 bg-white md:col-span-2">
                <div className="flex h-[52px] items-center gap-2 rounded-t-xl border-b border-slate-100 bg-slate-50/50 px-5">
                  <AlertTriangle size={16} className="text-amber-600" />
                  <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Regras de Risco Operacional
                  </h2>
                </div>

                <div className="space-y-4 p-5">
                  {/* Controle de Temperatura */}
                  <div
                    className={`rounded-xl border p-4 transition-all ${temperatura !== "Ambiente" ? "border-sky-300 bg-sky-50/30" : "border-slate-200 bg-white"}`}
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">
                        Ambiente de Transporte
                      </label>
                      <Select
                        onValueChange={setTemperatura}
                        value={temperatura}
                      >
                        <SelectTrigger className="h-10 border-slate-200 text-sm">
                          <SelectValue placeholder="Ambiente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ambiente">
                            Seco / Ambiente
                          </SelectItem>
                          <SelectItem value="Refrigerado">
                            Refrigerado (Positivo)
                          </SelectItem>
                          <SelectItem value="Congelado">
                            Congelado (Negativo)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {temperatura !== "Ambiente" && (
                      <div className="mt-4 grid animate-in grid-cols-2 gap-4 duration-200 fade-in zoom-in">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold tracking-wider text-sky-600 uppercase">
                            Temp. Mínima (°C)
                          </label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-10 border-sky-200 bg-sky-50 font-mono text-sm text-sky-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold tracking-wider text-rose-600 uppercase">
                            Temp. Máxima (°C)
                          </label>
                          <Input
                            type="number"
                            placeholder="0"
                            className="h-10 border-rose-200 bg-rose-50 font-mono text-sm text-rose-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Toggles (Hazmat, Fragil, Empilhavel) */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div
                      className={`rounded-xl border p-4 transition-all ${perigosa ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white"}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => setPerigosa(!perigosa)}
                          className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${perigosa ? "border-amber-600 bg-amber-500" : "border-slate-300"}`}
                        >
                          {perigosa && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">
                            Carga Perigosa (Hazmat)
                          </p>
                          {perigosa && (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <Input
                                placeholder="ONU"
                                className="h-8 font-mono text-xs"
                              />
                              <Input
                                placeholder="Classe"
                                className="h-8 font-mono text-xs"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFragil(!fragil)}
                      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-slate-300"
                    >
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${fragil ? "border-rose-600 bg-rose-500" : "border-slate-300"}`}
                      >
                        {fragil && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        Carga Frágil
                      </p>
                    </button>

                    <div
                      className={`rounded-xl border p-4 transition-all ${empilhavel ? "border-blue-300 bg-blue-50/40" : "border-slate-200 bg-white"}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => setEmpilhavel(!empilhavel)}
                          className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${empilhavel ? "border-blue-700 bg-blue-600" : "border-slate-300"}`}
                        >
                          {empilhavel && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800">
                            Permite Empilhamento
                          </p>

                          {empilhavel && (
                            <div className="mt-3 max-w-40 animate-in space-y-2 duration-200 fade-in zoom-in">
                              <label className="text-[11px] font-bold tracking-wider text-blue-600 uppercase">
                                Max. Camadas
                              </label>
                              <Input
                                type="number"
                                placeholder="1"
                                className="h-10 border-blue-200 bg-blue-50 font-mono text-sm text-blue-800"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Observações de Manuseio
                    </label>
                    <Textarea
                      placeholder="Instruções para pátio ou carga..."
                      className="min-h-[80px] border-slate-200 text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
                      <Layers size={14} /> Salvar como Modelo Frequente
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsTemplate(!isTemplate)}
                      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${isTemplate ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${isTemplate ? "left-6" : "left-1"}`}
                      />
                    </button>
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
