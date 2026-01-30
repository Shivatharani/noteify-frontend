import { UploadCloud } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadCard({
  onFileSelect,
  loading,
  progress,
}) {
  return (
    <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition text-center">

      <UploadCloud className="w-12 h-12 text-blue-600" />

      <h3 className="font-semibold text-lg">
        Upload Audio or Video
      </h3>

      <p className="text-sm text-slate-500">
        Supported formats:
        <br />
        mp3, wav, m4a, aac, mp4, avi, mov, mkv, webm
      </p>

      <input
        type="file"
        accept="audio/*,video/*"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />

      {loading && (
        <div className="w-full space-y-2 mt-4">
          <Progress value={progress} />
          <p className="text-xs text-slate-600 animate-pulse">
            Processing… please wait
          </p>
        </div>
      )}
    </label>
  )
}
