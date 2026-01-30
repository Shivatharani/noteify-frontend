import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"

import LandingPage from "./pages/LandingPage"
import UploadPage from "./pages/UploadPage"
import ResultPage from "./pages/ResultPage"

export default function App() {
  return (
    <BrowserRouter>

      {/* ✅ GLOBAL TOAST PROVIDER */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        duration={3000}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>

    </BrowserRouter>
  )
}
