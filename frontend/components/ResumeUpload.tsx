"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await api.post("resume/upload/", formData);
    alert("Resume uploaded successfully");
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold mb-2">Upload Resume (PDF)</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={upload} className="bg-black text-white px-4 py-2 mt-2">
        Upload
      </button>
    </div>
  );
}
