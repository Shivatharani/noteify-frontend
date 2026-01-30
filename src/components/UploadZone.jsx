import { useState, useCallback, useRef } from "react"
import { UploadCloud, FileAudio, FileVideo, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function UploadZone({ file, setFile, loading, progress }) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith('audio/') || droppedFile.type.startsWith('video/'))) {
      setFile(droppedFile)
    }
  }, [setFile])

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const removeFile = useCallback(() => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [setFile])

  if (loading) {
    return (
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg w-full max-w-2xl mx-auto">
        <CardContent className="p-8 flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-blue-200">
            <UploadCloud className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-center space-y-3">
            <h3 className="font-bold text-lg text-gray-900">Processing...</h3>
            <div className="w-full max-w-sm">
              <Progress value={progress} className="h-2" />
              <p className="text-xs font-medium text-blue-600 mt-1">{progress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={`border-2 transition-all duration-300 w-full max-w-2xl mx-auto ${
        dragActive 
          ? "border-blue-400 bg-blue-50 shadow-lg border-solid" 
          : "border-dashed border-gray-300 hover:border-blue-400 hover:shadow-lg hover:bg-blue-50"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <CardContent className="p-8 flex flex-col items-center gap-4 cursor-pointer">
        {!file ? (
          <>
            <div className="w-16 h-16 bg-blue-100 border-2 border-dashed border-blue-300 rounded-xl flex items-center justify-center hover:bg-blue-50">
              <UploadCloud className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">Drop audio/video lecture</h3>
              <p className="text-sm text-gray-600">Or click to browse</p>
            </div>
            <p className="text-xs text-gray-500 text-center">mp3, wav, m4a, mp4, mov, etc. (Max 100MB)</p>
            <Button 
              variant="outline" 
              size="sm"
              className="px-6 h-10 border-blue-300 hover:bg-blue-600 hover:text-white"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse
            </Button>
          </>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile} className="h-8 w-8 p-0 hover:bg-red-100">
                <X className="w-4 h-4" />
              </Button>
            </div>
            {file.type.startsWith("audio/") && (
              <audio controls className="w-full rounded-lg">
                <source src={URL.createObjectURL(file)} />
              </audio>
            )}
            {file.type.startsWith("video/") && (
              <video controls className="w-full rounded-lg aspect-video">
                <source src={URL.createObjectURL(file)} />
              </video>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,video/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </CardContent>
    </Card>
  )
}
