import { UploadCloud } from "lucide-react"

export default function UploadZone({ file, setFile }) {
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) setFile(droppedFile)
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:border-blue-500 transition"
    >
      <UploadCloud className="mx-auto w-12 h-12 text-blue-600 mb-4" />

      <p className="font-medium">Drag & drop audio/video here</p>
      <p className="text-sm text-slate-500 mt-1">
        mp3, wav, m4a, aac, mp4, avi, mov, mkv, webm
      </p>

      <input
        type="file"
        accept="audio/*,video/*"
        className="hidden"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label
        htmlFor="fileInput"
        className="inline-block mt-4 text-blue-600 underline cursor-pointer"
      >
        Browse file
      </label>

      {file && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium">
            Selected file: <span className="text-blue-600">{file.name}</span>
          </p>

          {file.type.startsWith("audio") && (
            <audio controls className="w-full">
              <source src={URL.createObjectURL(file)} />
            </audio>
          )}

          {file.type.startsWith("video") && (
            <video controls className="w-full rounded">
              <source src={URL.createObjectURL(file)} />
            </video>
          )}
        </div>
      )}
    </div>
  )
}
