import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App.jsx"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./contexts/AuthContext"
import { BrandProvider } from "./contexts/BrandContext"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrandProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BrandProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)