import { BrowserRouter, Routes, Route } from "react-router-dom"
import UploadPage from "./pages/UploadPage"
import ResultPage from "./pages/ResultPage"
import { Toaster } from "sonner"

export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
