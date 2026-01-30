import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import Header from "../components/Header"
import UploadZone from "../components/UploadZone"
import { processLecture } from "../api/noteifyApi"
import { useNavigate } from "react-router-dom"

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please upload a file")
      return
    }

    setLoading(true)
    toast.success("Processing started")

    try {
      const res = await processLecture(file, setProgress)
      toast.success("Notes generated successfully")
      navigate("/result", { state: res.data })
    } catch {
      toast.error("Processing failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <Header />

        <UploadZone file={file} setFile={setFile} />

        {loading && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-slate-600 animate-pulse">
              Processing…
            </p>
          </div>
        )}

        <Button className="w-full" onClick={handleProcess} disabled={loading}>
          Generate Notes
        </Button>
      </div>
    </div>
  )
}
