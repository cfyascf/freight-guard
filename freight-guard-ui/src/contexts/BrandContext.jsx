import { createContext, useContext, useState } from "react"
import { useAuth } from "./AuthContext"

const BrandContext = createContext()

export function BrandProvider({ children }) {
  const { user } = useAuth()

  const [brandPrefs, setBrandPrefs] = useState(() => {
    const stored = localStorage.getItem("fg-brand-prefs")
    if (stored) return JSON.parse(stored)
    return { contractor: "corporate", carrier: "industrial" }
  })

  const styles = {
    midnight: {
      id: "midnight",
      name: "Midnight Premium",
      sidebarBg: "bg-[#0B1120]",
      sidebarBorder: "border-blue-900/30",
      navText: "text-slate-400",
      navHover: "hover:bg-white/5 hover:text-white",
      navActive: "bg-blue-600 text-white shadow-lg shadow-blue-900/20",
      accent: "text-blue-500",
      brandBg: "bg-blue-600",
      brandIcon: "text-white",
      headerBg: "bg-[#0B1120]",
      textMain: "text-white",
      textMuted: "text-slate-400",
      footerBg: "bg-white/5",
    },
    industrial: {
      id: "industrial",
      name: "Industrial Night",
      sidebarBg: "bg-zinc-950",
      sidebarBorder: "border-zinc-900",
      navText: "text-zinc-400",
      navHover: "hover:bg-zinc-900 hover:text-white",
      navActive:
        "bg-emerald-900/30 text-emerald-400 border border-emerald-900/50",
      accent: "text-emerald-500",
      brandBg: "bg-emerald-500",
      brandIcon: "text-white",
      headerBg: "bg-zinc-950",
      textMain: "text-white",
      textMuted: "text-zinc-500",
      footerBg: "bg-zinc-900/50",
    },
    corporate: {
      id: "corporate",
      name: "Corporate Clean",
      sidebarBg: "bg-white",
      sidebarBorder: "border-slate-200",
      navText: "text-slate-600",
      navHover: "hover:bg-slate-100 hover:text-slate-900",
      navActive: "bg-blue-50 text-blue-700 font-semibold shadow-sm",
      accent: "text-blue-600",
      brandBg: "bg-blue-600",
      brandIcon: "text-white",
      headerBg: "bg-white",
      textMain: "text-slate-800",
      textMuted: "text-slate-500",
      footerBg: "bg-slate-50",
    },
    sunset: {
      id: "sunset",
      name: "Sunset Cargo",
      sidebarBg: "bg-[#1c0f0a]",
      sidebarBorder: "border-amber-900/30",
      navText: "text-amber-500",
      navHover: "hover:bg-amber-900/30 hover:text-amber-100",
      navActive: "bg-amber-600 text-white shadow-lg shadow-amber-900/20",
      accent: "text-amber-500",
      brandBg: "bg-amber-600",
      brandIcon: "text-white",
      headerBg: "bg-[#1c0f0a]",
      textMain: "text-orange-50",
      textMuted: "text-amber-600/70",
      footerBg: "bg-white/5",
    },
  }

  const currentThemeKey = brandPrefs[user.role] || "midnight"
  const currentBrandStyle = styles[currentThemeKey]

  const setBrand = (styleKey) => {
    const newPrefs = { ...brandPrefs, [user.role]: styleKey }
    setBrandPrefs(newPrefs)
    localStorage.setItem("fg-brand-prefs", JSON.stringify(newPrefs))
  }

  return (
    <BrandContext.Provider
      value={{
        brand: currentBrandStyle,
        setBrand,
        currentKey: currentThemeKey,
        availableThemes: Object.values(styles), 
      }}
    >
      {children}
    </BrandContext.Provider>
  )
}

export const useBrand = () => useContext(BrandContext)
