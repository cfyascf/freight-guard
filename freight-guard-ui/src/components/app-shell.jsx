import { Bell, Box, ChartBar, Package, Shield, User, Truck } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: ChartBar,
  },
  {
    label: "Gestão de Cargas",
    to: "/load-management",
    icon: Box,
  },
  {
    label: "Painel de Leilão",
    to: "/freights-panel",
    icon: Truck,
  },
  {
    label: "Mural de Fretes",
    to: "/freights-mural",
    icon: Truck,
  },
  {
    label: "Gestão de Fretes",
    to: "/freight-management",
    icon: Package,
  },
]

export default function AppShell({ title, actions, children }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <aside className="z-10 flex w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            <Shield size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Freight<span className="text-blue-600">Guard</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">
          <p className="mb-2 mt-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu Principal
          </p>
          {navigationItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg px-4 py-2.5 transition-colors",
                  isActive
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )
              }
            >
              <Icon size={18} className="mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-slate-500">
              <User size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-700">Yasmim</p>
              <p className="text-xs text-slate-500">Visao: Contratante</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-red-500"></span>
            </Button>
            {actions}
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-slate-50/50 p-8">{children}</div>
      </main>
    </div>
  )
}