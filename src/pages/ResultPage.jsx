import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import Header from "../components/Header"
import PdfPreview from "../components/PdfPreview"

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) return null

  const pdfUrl = `http://localhost:8000${state.pdf_url}`

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            ← Back
          </Button>
          <Header />
        </div>

        <div className="space-y-2 text-slate-700 leading-relaxed text-base">
          <h2 className="font-semibold text-lg">Executive Summary</h2>
          <p>{state.output.summary_paragraph}</p>
        </div>

        <div className="space-y-2 text-slate-700 leading-relaxed text-base">
          <h2 className="font-semibold text-lg">Full Transcription</h2>
          <ScrollArea className="h-80 border rounded p-4">
            <p className="whitespace-pre-wrap">
              {state.output.full_transcription}
            </p>
          </ScrollArea>
        </div>

        <PdfPreview pdfUrl={pdfUrl} />

        <Button
          className="w-full"
          onClick={() => {
            toast.success("PDF downloaded")
            window.open(pdfUrl, "_blank")
          }}
        >
          Download PDF
        </Button>
      </div>
    </div>
  )
}
