import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { GraduationCap, FileText, Sparkles } from "lucide-react"
import Header from "../components/Header"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* Header */}
        <Header />

        {/* Hero */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Turn Lectures into
            <span className="block text-blue-700 mt-2">
              Structured Academic Notes
            </span>
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            NOTEIFY AI helps students and educators convert recorded lectures
            into accurate transcriptions, executive summaries, and
            professionally formatted PDF notes.
          </p>

          <Button
            onClick={() => navigate("/upload")}
            className="h-16 px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <Highlight
            icon={<GraduationCap />}
            title="Academic Focused"
            color="from-blue-500 to-blue-600"
          />
          <Highlight
            icon={<Sparkles />}
            title="AI Powered"
            color="from-indigo-500 to-indigo-600"
          />
          <Highlight
            icon={<FileText />}
            title="Professional PDFs"
            color="from-emerald-500 to-emerald-600"
          />
        </div>
      </div>
    </div>
  )
}

function Highlight({ icon, title, color }) {
  return (
    <div className="bg-white/80 shadow-xl rounded-2xl p-8 text-center space-y-4">
      <div
        className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
  )
}
