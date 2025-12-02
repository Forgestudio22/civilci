import { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  Upload,
  FileText,
  Image,
  File,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";
import type { EvidenceFile } from "@shared/schema";

interface EvidenceUploadProps {
  caseId: string;
}

const fileTypeIcons: Record<string, typeof FileText> = {
  "application/pdf": FileText,
  "application/msword": FileText,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": FileText,
  "image/jpeg": Image,
  "image/png": Image,
  "image/gif": Image,
  "text/plain": File,
};

function formatFileSize(bytes: string): string {
  const size = parseInt(bytes, 10);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function EvidenceUpload({ caseId }: EvidenceUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const { data: files, isLoading } = useQuery<EvidenceFile[]>({
    queryKey: [`/api/case-reviews/${caseId}/evidence`],
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadProgress(file.name);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`/api/case-reviews/${caseId}/evidence`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/case-reviews/${caseId}/evidence`] });
      setUploadProgress(null);
      toast({
        title: "File uploaded",
        description: "Your evidence file has been uploaded successfully.",
      });
    },
    onError: (error: Error) => {
      setUploadProgress(null);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const response = await fetch(`/api/evidence/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok && response.status !== 204) {
        const error = await response.json();
        throw new Error(error.message || "Delete failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/case-reviews/${caseId}/evidence`] });
      toast({
        title: "File deleted",
        description: "The evidence file has been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    Array.from(selectedFiles).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        });
        return;
      }
      uploadMutation.mutate(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/evidence/${fileId}/download`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Download failed");
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message || "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-gold" />
          Evidence & Documents
        </CardTitle>
        <CardDescription>
          Upload supporting documents for your case
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragging ? "border-gold bg-gold/5" : "border-border"}
            ${uploadMutation.isPending ? "opacity-60 pointer-events-none" : ""}
          `}
          data-testid="dropzone-evidence"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
            onChange={(e) => handleFileSelect(e.target.files)}
            data-testid="input-file-evidence"
          />
          
          {uploadMutation.isPending ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-gold animate-spin mb-4" />
              <p className="text-foreground font-medium">Uploading...</p>
              <p className="text-sm text-muted-foreground">{uploadProgress}</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-foreground mb-2">
                Drag and drop files here, or click to select
              </p>
              <p className="text-sm text-muted-foreground/70 mb-4">
                Supported: PDF, DOC, DOCX, JPG, PNG, GIF, TXT (Max 10MB)
              </p>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-select-files"
              >
                Select Files
              </Button>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="mt-6 space-y-3">
            {[1, 2].map(i => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : files && files.length > 0 ? (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Uploaded Files ({files.length})
            </h4>
            {files.map(file => {
              const FileIcon = fileTypeIcons[file.fileType] || File;
              return (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-background"
                  data-testid={`file-item-${file.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-md bg-gold/10">
                      <FileIcon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate" title={file.fileName}>
                        {file.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.fileSize)} • 
                        {new Date(file.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDownload(file.id, file.fileName)}
                      title="Download"
                      data-testid={`button-download-${file.id}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(file.id)}
                      disabled={deleteMutation.isPending}
                      className="text-destructive hover:text-destructive"
                      title="Delete"
                      data-testid={`button-delete-${file.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
