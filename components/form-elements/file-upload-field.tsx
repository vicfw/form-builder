"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploadProperties } from "@/lib/store/form-elements-store";
import { toast } from "sonner";

interface FileUploadFieldProps {
  properties: FileUploadProperties;
  id: string;
}

interface FileState {
  file: File | null;
  preview: string | null;
  error?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function FileUploadField({
  properties,
  id,
}: FileUploadFieldProps) {
  const {
    label,
    isRequired,
    placeholder,
    acceptedFileTypes,
    maxFileSize,
    multiple,
  } = properties;
  const [fileState, setFileState] = React.useState<FileState>({
    file: null,
    preview: null,
  });
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Validate file
  const validateFile = React.useCallback(
    (file: File): string | null => {
      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const fileType = file.type;
        if (!acceptedFileTypes.includes(fileType)) {
          return `File type not accepted. Please upload: ${acceptedFileTypes.join(
            ", "
          )}`;
        }
      }

      if (maxFileSize && file.size > maxFileSize) {
        return `File size too large. Maximum size: ${formatFileSize(
          maxFileSize
        )}`;
      }

      return null;
    },
    [acceptedFileTypes, maxFileSize]
  );

  // Handle drag events
  const handleDragEnter = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle file selection
  const handleFile = React.useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        setFileState({ file: null, preview: null, error });
        return;
      }

      setFileState({
        file,
        preview: URL.createObjectURL(file),
        error: undefined,
      });
    },
    [validateFile]
  );

  // Handle drop event
  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  // Handle click upload
  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle file input change
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  // Handle file removal
  const handleRemove = React.useCallback(() => {
    setFileState({ file: null, preview: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  // Cleanup preview URL on unmount
  React.useEffect(() => {
    return () => {
      if (fileState.preview) {
        URL.revokeObjectURL(fileState.preview);
      }
    };
  }, [fileState.preview]);

  return (
    <div className={cn("flex flex-col gap-2", "max-w-[200px] w-full")}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-destructive ms-1">*</span>}
      </Label>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-input hover:border-primary/50",
          fileState.file && !fileState.error && "border-success bg-success/10",
          fileState.error && "border-destructive bg-destructive/10"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          className="hidden"
          onChange={handleChange}
          accept={acceptedFileTypes?.join(",")}
          multiple={multiple}
        />

        {fileState.file ? (
          <div className="flex items-center gap-2 justify-center w-full">
            <File className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate max-w-[120px]">
              {fileState.file.name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            {fileState.error ? (
              <AlertCircle className="h-8 w-8 text-destructive flex-shrink-0" />
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground flex-shrink-0" />
            )}
            <p className="text-sm text-muted-foreground break-words text-center px-2">
              {fileState.error ||
                placeholder ||
                "Drop file here or click to upload"}
            </p>
            {(acceptedFileTypes?.length || maxFileSize) && (
              <p className="text-xs text-muted-foreground text-center px-2 break-words">
                {acceptedFileTypes?.length
                  ? `Accepted types: ${acceptedFileTypes.join(", ")}`
                  : ""}
                {maxFileSize ? ` Max size: ${formatFileSize(maxFileSize)}` : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
