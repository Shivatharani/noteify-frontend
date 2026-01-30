import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
})

export const processLecture = (file, onProgress) => {
  const formData = new FormData()
  formData.append("file", file)

  return api.post("/api/process", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      const percent = Math.round((e.loaded * 100) / e.total)
      onProgress(percent)
    },
  })
}
