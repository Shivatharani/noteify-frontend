import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import Header from "../components/Header"
import UploadZone from "../components/UploadZone"
import { processLecture } from "../api/noteifyAPI"
import { useNavigate } from "react-router-dom"
import { FileAudio, Video, Sparkles, FileDown } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select a lecture file")
      return
    }

    setLoading(true)
    try {
      const res = await processLecture(file, setProgress)
      toast.success("Lecture processed successfully")
      navigate("/result", { state: res.data })
    } catch {
      toast.error("Processing failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        <Header />

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard icon={<FileAudio />} text="Audio Lectures" color="blue" />
          <InfoCard icon={<Video />} text="Video Lectures" color="indigo" />
          <InfoCard icon={<Sparkles />} text="AI Processing" color="purple" />
          <InfoCard icon={<FileDown />} text="PDF Export" color="emerald" />
        </div>

        {/* Upload */}
        <div className="flex flex-col items-center space-y-8">
          <UploadZone
            file={file}
            setFile={setFile}
            loading={loading}
            progress={progress}
          />

          <Button
            onClick={handleProcess}
            disabled={loading || !file}
            className="w-full lg:w-[460px] h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl"
          >
            Generate Notes
          </Button>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, text, color }) {
  return (
    <Card className="bg-white/90 shadow-lg rounded-2xl">
      <CardContent className="p-6 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl bg-${color}-100 text-${color}-600 flex items-center justify-center`}
        >
          {icon}
        </div>
        <p className="font-semibold text-gray-800">{text}</p>
      </CardContent>
    </Card>
  )
}
