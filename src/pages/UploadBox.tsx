import { useState } from "react"
import { useResumeStore } from "@/store/resumeStore"

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null)
  const addResume = useResumeStore((s) => s.addResume)

  const handleUpload = () => {
    if (!file) return

    addResume(file.name)
    alert("Uploaded (frontend only) ✅")
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold mb-2">Upload Resume</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Upload
      </button>
    </div>
  )
}
