"use client";

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedResume, setUploadedResume] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const upload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("resume/upload/", formData);

      clearInterval(interval);
      setProgress(100);

      setUploadedResume(response.data);

      // Reset after success
      setTimeout(() => {
        setFile(null);
        setProgress(0);
        setUploading(false);
      }, 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Upload failed. Please try again.",
      );
      setProgress(0);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          file
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
        )}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>

          <div className="text-center">
            <Label htmlFor="resume-upload" className="cursor-pointer">
              <span className="font-medium text-primary hover:text-primary/80">
                Click to upload
              </span>
              <span className="text-muted-foreground"> or drag and drop</span>
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              PDF files only (Max 5MB)
            </p>
          </div>

          <Input
            id="resume-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {file && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            {progress < 100 ? "Uploading..." : "Processing..."}
          </p>
        </div>
      )}

      {uploadedResume && (
        <Alert className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertTitle>Upload Successful!</AlertTitle>
          <AlertDescription>
            Resume uploaded successfully. Resume ID:{" "}
            <span className="font-medium">{uploadedResume.id}</span>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={upload} className="w-full" disabled={!file || uploading}>
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </>
        )}
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        Your resume is securely stored and encrypted. We never share your data.
      </div>
    </div>
  );
}
