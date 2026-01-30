import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  FileText,
  AlignLeft,
  Copy,
  Download,
} from "lucide-react"
import { toast } from "sonner"

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.output) {
    navigate("/")
    return null
  }

  const pdfUrl = `http://localhost:8000${state.pdf_url}`

  const copyText = async (text, label) => {
    await navigator.clipboard.writeText(text)
    toast.success(`${label} copied successfully`)
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Result Header – NOT FULL WIDTH */}
      <div className="px-4 pt-6">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg">
          <Header />
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Button
          onClick={() => navigate("/upload")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Lecture
        </Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 py-12 px-4">

        {/* Executive Summary */}
        <Card className="shadow-xl">
          <CardHeader className="bg-emerald-600 text-white flex flex-row items-center gap-3 px-8 py-5">
            <FileText className="w-6 h-6" />
            <CardTitle className="text-xl font-bold">
              Executive Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <p className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed">
              {state.output.summary_paragraph}
            </p>

            <Button
              variant="outline"
              onClick={() =>
                copyText(state.output.summary_paragraph, "Summary")
              }
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Summary
            </Button>
          </CardContent>
        </Card>

        {/* Full Transcription */}
        <Card className="shadow-xl">
          <CardHeader className="bg-blue-600 text-white flex flex-row items-center gap-3 px-8 py-5">
            <AlignLeft className="w-6 h-6" />
            <CardTitle className="text-xl font-bold">
              Full Transcription
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[480px] p-8">
              <p className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed">
                {state.output.full_transcription}
              </p>
            </ScrollArea>

            <div className="p-6 border-t">
              <Button
                variant="outline"
                onClick={() =>
                  copyText(
                    state.output.full_transcription,
                    "Transcription"
                  )
                }
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Transcription
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Download PDF */}
        <div className="text-center">
          <Button
            onClick={() => {
              toast.success("PDF download started")
              window.open(pdfUrl, "_blank")
            }}
            className="h-16 px-10 text-lg font-semibold rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Download className="w-6 h-6 mr-3" />
            Download PDF Notes
          </Button>
        </div>
      </div>
    </div>
  )
}
