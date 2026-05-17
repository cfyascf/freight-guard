/* eslint-disable react/prop-types */
import {
  Bell,
  Check,
  Box,
  ChartBar,
  Package,
  Shield,
  User,
  Truck,
  Settings,
  Palette,
  ChevronDown,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useBrand } from "@/contexts/BrandContext"
import { Button } from "@/components/ui/button"
import { ROLE_OPTIONS, ROLES } from "@/constants/roles"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AppShell({ title, actions, children }) {
  const { user, setRole } = useAuth()
  const { brand, setBrand, currentKey, availableThemes } = useBrand()

  const isContractor = user.role === ROLES.CONTRACTOR
  const isDeveloper = user.role === ROLES.DEVELOPER

  const contractorMenus = [
    { label: "Visão Geral", to: "/dashboard", icon: ChartBar },
    { label: "Gestão de Cargas", to: "/load-management", icon: Box },
    { label: "Painel de Leilão", to: "/freights-panel", icon: Truck },
    { label: "Gestão de Rotas", to: "/route-management", icon: Package },
    { label: "Gestão de Produtos", to: "/products-management", icon: Package },
  ]

  const carrierMenus = [
    { label: "Visão Geral", to: "/dashboard", icon: ChartBar },
    { label: "Ofertas de Frete", to: "/freights-mural", icon: Truck },
    { label: "Gestão de Veículos", to: "/freight-management", icon: Package },
  ]

  const developerMenus = [...contractorMenus, ...carrierMenus.filter((item) => item.to !== "/dashboard")]

  let activeMenus = carrierMenus
  let panelLabel = "Painel Transportador"
  let roleLabel = "Transportador"

  if (isDeveloper) {
    activeMenus = developerMenus
    panelLabel = "Painel Desenvolvedor"
    roleLabel = "Desenvolvedor"
  } else if (isContractor) {
    activeMenus = contractorMenus
    panelLabel = "Painel Contratante"
    roleLabel = "Contratante"
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      {/* SIDEBAR COM TEMA DINÂMICO */}
      <aside
        className={cn(
          "z-20 flex h-full w-64 shrink-0 flex-col border-r shadow-2xl transition-all duration-500",
          brand.sidebarBg,
          brand.sidebarBorder
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b px-6 transition-colors duration-500",
            brand.sidebarBorder
          )}
        >
          <div
            className={cn(
              "mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm transition-colors duration-500",
              brand.brandBg,
              brand.brandIcon
            )}
          >
            <Shield size={18} strokeWidth={2.5} />
          </div>
          <span
            className={cn("text-xl font-black tracking-tight", brand.textMain)}
          >
            Freight{" "}
            <span
              className={cn("transition-colors duration-500", brand.accent)}
            >
              Guard
            </span>
          </span>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 text-xs">
          <p
            className={cn(
              "mb-3 px-2 text-[10px] font-bold tracking-widest uppercase opacity-60",
              brand.textMuted
            )}
          >
            {panelLabel}
          </p>
          {activeMenus.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg px-3 py-2.5 transition-all duration-300",
                  isActive ? brand.navActive : cn(brand.navText, brand.navHover)
                )
              }
            >
              <Icon size={18} className="mr-3 shrink-0" />
              <span className="text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Rodapé da Sidebar - Botão de Mudar Role */}
        <div
          className={cn(
            "flex shrink-0 flex-col gap-3 border-t p-4 transition-colors duration-500",
            brand.sidebarBorder,
            brand.footerBg
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full border-transparent text-[10px] font-bold shadow-sm",
                  brand.navHover,
                  brand.textMuted,
                  brand.footerBg
                )}
              >
                <span>Perfil: {roleLabel}</span>
                <ChevronDown size={14} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                <DropdownMenuLabel className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Alternar Perfil
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {ROLE_OPTIONS.map((roleOption) => (
                  <DropdownMenuItem
                    key={roleOption.value}
                    onClick={() => setRole(roleOption.value)}
                    className="cursor-pointer text-xs font-semibold"
                  >
                    <Check
                      size={14}
                      className={cn(
                        "mr-2",
                        user.role === roleOption.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {roleOption.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          <div className="mt-2 flex items-center">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-inner",
                brand.footerBg,
                brand.textMain
              )}
            >
              <User size={18} />
            </div>
            <div className={cn("ml-3 overflow-hidden", brand.textMain)}>
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p
                className={cn(
                  "text-[10px] font-black uppercase opacity-70",
                  brand.accent
                )}
              >
                {roleLabel}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* HEADER COM ENGRENAGEM (Menu iterado dinamicamente) */}
        <header
          className={cn(
            "z-10 flex h-16 shrink-0 items-center justify-between border-b px-8 shadow-sm transition-colors duration-500",
            brand.headerBg,
            brand.sidebarBorder,
            brand.textMain
          )}
        >
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn("hover:bg-black/5", brand.textMuted)}
            >
              <Bell size={20} />
            </Button>

            {/* Menu de Configurações (Engrenagem) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("hover:bg-black/5", brand.textMuted)}
                >
                  <Settings size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Personalizar Tema
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Iterando sobre os temas disponíveis no Contexto */}
                {availableThemes.map((t) => (
                  <DropdownMenuItem
                    key={t.id}
                    onClick={() => setBrand(t.id)}
                    className={cn(
                      "cursor-pointer font-medium",
                      currentKey === t.id &&
                        "bg-blue-50 text-blue-600 focus:bg-blue-100 focus:text-blue-700"
                    )}
                  >
                    <Palette
                      size={16}
                      className={cn(
                        "mr-2",
                        currentKey === t.id ? "text-blue-600" : "text-slate-400"
                      )}
                    />
                    {t.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {actions}
          </div>
        </header>

        {/* Conteúdo */}
        <div className="flex-1 overflow-auto bg-slate-50 p-8">
          <div className="mx-auto max-w-7xl animate-in duration-500 fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
