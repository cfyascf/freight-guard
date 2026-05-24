/**
 * CENTRALIZED ROUTE MANIFEST
 *
 * Each entry in ROUTES is the single source of truth for a route's:
 * - path       — URL path used by React Router
 * - element    — Page component to render
 * - access     — Who can see this route:
 * "public"          → unauthenticated users only (PublicOnly guard)
 * "auth"            → any authenticated user (RequireAuth guard)
 * [ROLES.X, ...]    — specific role(s) (RequireRole guard)
 * - nav        — true if this route should appear in the sidebar navigation
 * - label      — sidebar display text (required when nav: true)
 * - icon       — Lucide icon component (required when nav: true)
 *
 * Adding a new page = add one entry here. Route guard and sidebar nav update automatically.
 */

import {
  LayoutDashboard,
  Boxes,
  Gavel,
  Map,
  Waypoints,
  Tags,
  ClipboardList,
  Truck,
} from "lucide-react"

import AuthPage from "@/pages/Auth"
import Dashboard from "@/pages/Dashboard"
import RouteOverview from "@/pages/RouteOverview"
import TransportOverview from "@/pages/TransportOverview"
import VehicleForm from "@/pages/VehicleForm"
import LoadManagement from "@/pages/LoadManagement"
import CreateLoad from "@/pages/CreateLoad"
import LoadDetails from "@/pages/LoadDetails"
import CreateRoute from "@/pages/CreateRoute"
import CreateProduct from "@/pages/CreateProduct"
import CreateFreightAuction from "@/pages/CreateFreightAuction"
import AuctionBids from "@/pages/AuctionBids"
import FreightsPanel from "@/pages/FreightsPanel"
import RouteManagement from "@/pages/RouteManagement"
import ProductManagement from "@/pages/ProductsManagement"
import TransporterManagement from "@/pages/TransporterManagement"
import CarrierManagement from "@/pages/CarrierManagement"
import FreightsMural from "@/pages/FreightsMural"
import FreightManagement from "@/pages/FreightManagement"
import EditStretch from "@/pages/EditStretch"

// Novas páginas para a lógica de Trechos (Stretches)
import StretchManagement from "@/pages/StretchManagement"
import CreateStretch from "@/pages/CreateStretch"

import { ROLES } from "@/constants/roles"
import { Auth as AuthAccess } from "@/constants/auth"
import LoadVisualizationTest from "@/pages/test/LoadVisualizationTest"


export const ROUTES = [
  
  // Public only (unauthenticated access only)
  { path: "/",        element: <AuthPage />,  access: AuthAccess.PUBLIC, nav: false },
  { path: "/auth",    element: <AuthPage />,  access: AuthAccess.PUBLIC, nav: false },
  { path: "/login",   element: <AuthPage />,  access: AuthAccess.PUBLIC, nav: false },
  { path: "/register",element: <AuthPage />,  access: AuthAccess.PUBLIC, nav: false },

  //TESTES - NÃO DEFINITIVO
  { 
  path: "/test-visualization", 
  element: <LoadVisualizationTest />, 
  access: [ROLES.CONTRACTOR, ROLES.DEVELOPER], 
  nav: false 
  },

  // Authenticated only (all roles)
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Visão Geral",
    icon: LayoutDashboard,
    access: AuthAccess.AUTHENTICATED,
    nav: true,
  },
  { path: "/route-overview",     element: <RouteOverview />,     access: AuthAccess.AUTHENTICATED, nav: false },
  { path: "/transport-overview", element: <TransportOverview />, access: AuthAccess.AUTHENTICATED, nav: false },
  { path: "/vehicle-form",       element: <VehicleForm />,       access: AuthAccess.AUTHENTICATED, nav: false },


  // Contractor only
  {
    path: "/load-management",
    element: <LoadManagement />,
    label: "Gestão de Cargas",
    icon: Boxes,
    access: [ROLES.CONTRACTOR],
    nav: true,
  },
  { path: "/create-load", element: <CreateLoad />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/load-details/:loadId", element: <LoadDetails />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/create-route", element: <CreateRoute />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/create-product", element: <CreateProduct />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/create-freight-auction", element: <CreateFreightAuction />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/auction-bids", element: <AuctionBids />, access: [ROLES.CONTRACTOR], nav: false },
  { path: "/auction-bids/:loadId", element: <AuctionBids />, access: [ROLES.CONTRACTOR], nav: false },
  {
    path: "/freights-panel",
    element: <FreightsPanel />,
    label: "Painel de Leilão",
    icon: Gavel,
    access: [ROLES.CONTRACTOR],
    nav: true,
  },
  {
    path: "/route-management",
    element: <RouteManagement />,
    label: "Gestão de Rotas",
    icon: Map,
    access: [ROLES.CONTRACTOR],
    nav: true,
  },
  {
    path: "/products-management",
    element: <ProductManagement />,
    label: "Gestão de Produtos",
    icon: Tags,
    access: [ROLES.CONTRACTOR],
    nav: true,
  },
  
  // NOVAS ROTAS INSERIDAS AQUI:
  {
    path: "/stretch-management",
    element: <StretchManagement />,
    label: "Gestão de Trechos",
    icon: Waypoints,
    access: [ROLES.CONTRACTOR],
    nav: true, // Visível no menu lateral para o Contractor
  },
  { 
    path: "/create-stretch", 
    element: <CreateStretch />, 
    access: [ROLES.CONTRACTOR], 
    nav: false // Acedido por links e botões, invisível na barra lateral
  },
  { 
    path: "/edit-stretch/:stretchId", 
    element: <EditStretch />, 
    access: [ROLES.CONTRACTOR], 
    nav: false 
  },

  { path: "/product-management",      element: <ProductManagement />,      access: [ROLES.CONTRACTOR], nav: false },
  { path: "/transporters-management", element: <TransporterManagement />,  access: [ROLES.CONTRACTOR], nav: false },
  { path: "/carrier-management",      element: <CarrierManagement />,      access: [ROLES.CONTRACTOR], nav: false },

  
  // Carrier only
  {
    path: "/freights-mural",
    element: <FreightsMural />,
    label: "Ofertas de Frete",
    icon: ClipboardList,
    access: [ROLES.CARRIER],
    nav: true,
  },
  {
    path: "/freight-management",
    element: <FreightManagement />,
    label: "Gestão de Veículos",
    icon: Truck,
    access: [ROLES.CARRIER],
    nav: true,
  },
  { path: "/fleet-management", element: <FreightManagement />, access: [ROLES.CARRIER], nav: false },
]

/**
 * Returns the sidebar nav items visible to a given role.
 *
 * Rules:
 * - nav: false  → always excluded
 * - access: AuthAccess.PUBLIC         → excluded (not authenticated pages)
 * - access: AuthAccess.AUTHENTICATED  → included for every role
 * - access: [roles]  → included if role is in the array OR role is DEVELOPER
 * (DEVELOPER sees everything, mirroring RequireRole's bypass logic)
 */
export function getNavItems(role) {
  return ROUTES.filter((route) => {
    if (!route.nav) return false
    if (route.access === AuthAccess.PUBLIC) return false
    if (route.access === AuthAccess.AUTHENTICATED) return true
    return role === ROLES.DEVELOPER || route.access.includes(role)
  })
}