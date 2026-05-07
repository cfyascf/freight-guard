import { useState } from "react"
import { Box, MoreHorizontal, Pencil, Plus, Trash2, AlertTriangle, Package, Scale } from "lucide-react"

import AppShell from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function ProductManagement() {
  // Mock inicial dos produtos com os novos campos focados em logística
  const [produtos, setProdutos] = useState([
    {
      id: "PRD-1001",
      sku: "CBO-099",
      nome: "Cebola Roxa (Saca)",
      tipo: "Alimentício",
      fragil: false,
    },
    {
      id: "PRD-1002",
      sku: "MTR-V800",
      nome: "Motor Automotivo V8",
      tipo: "Peça",
      fragil: true,
    },
    {
      id: "PRD-1003",
      sku: "CASC-INV",
      nome: "Casaco de Inverno",
      tipo: "Roupa",
      fragil: false,
    },
    {
      id: "PRD-1004",
      sku: "VD-MED",
      nome: "Ampolas de Vacina",
      tipo: "Medicamento",
      fragil: true,
    }
  ])

  const handleDelete = (idParaDeletar) => {
    setProdutos(produtos.filter(produto => produto.id !== idParaDeletar))
  }

  const handleEdit = (produto) => {
    alert(`Abrir modal de edição para o produto: ${produto.nome}`)
  }

  return (
    <AppShell 
      title="Gestão de Produtos"
      actions={
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 md:w-auto">
          <Plus size={16} className="mr-2" /> 
          Novo Produto
        </Button>
      }
    >
      <div className="flex flex-col space-y-6 p-2 md:p-6">
        
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-semibold flex items-center text-slate-800">
              <Package size={18} className="mr-2 text-blue-600" />
              Catálogo de Produtos
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px] font-semibold">SKU</TableHead>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Categoria / Tipo</TableHead>
                  <TableHead className="font-semibold text-center">Cuidados</TableHead>
                  <TableHead className="text-right font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      Nenhum produto cadastrado no momento.
                    </TableCell>
                  </TableRow>
                ) : (
                  produtos.map((produto) => (
                    <TableRow key={produto.id} className="hover:bg-slate-50/50 transition-colors">
                      
                      <TableCell className="font-medium text-slate-500 text-xs">
                        {produto.sku}
                      </TableCell>
                      
                      <TableCell className="font-semibold text-slate-800">
                        {produto.nome}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center text-slate-600">
                          <Box size={14} className="mr-1.5 text-slate-400" />
                          {produto.tipo}
                        </div>
                      </TableCell>
                      

                      <TableCell className="text-center">
                        {produto.fragil ? (
                          <Badge variant="destructive" className="bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100">
                            <AlertTriangle size={12} className="mr-1" />
                            Frágil
                          </Badge>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </TableCell>
                      
                      {/* Menu de Ações */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal size={16} className="text-slate-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            
                            <DropdownMenuItem 
                              className="cursor-pointer text-slate-700"
                              onClick={() => handleEdit(produto)}
                            >
                              <Pencil size={14} className="mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem 
                              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                              onClick={() => handleDelete(produto.id)}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Excluir
                            </DropdownMenuItem>
                            
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </AppShell>
  )
}