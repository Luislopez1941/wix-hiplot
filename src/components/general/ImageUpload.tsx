import React, { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import "./styles/ImageUpload.css";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUpload({
  onImagesChange,
  maxImages = 5,
  className,
}: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, maxImages - images.length);

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={`image-upload-container ${className || ""}`}>
      <div
        className={`upload-zone ${dragActive ? "drag-active" : ""} ${
          images.length >= maxImages ? "disabled" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon-container">
            <Upload className="upload-icon" />
          </div>
          <div>
            <p className="upload-text">
              Arrastra imágenes aquí o{" "}
              <button
                type="button"
                className="upload-button"
                onClick={() => fileInputRef.current?.click()}
              >
                busca archivos
              </button>
            </p>
            <p className="upload-description">
              PNG, JPG, WebP hasta 10MB cada una ({images.length}/{maxImages})
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden-input"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {images.length > 0 && (
        <div className="images-grid">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <div className="image-container">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
              </div>
              <button
                className="remove-button"
                onClick={() => removeImage(index)}
              >
                <X className="remove-icon" />
              </button>
              {index === 0 && (
                <div className="main-image-badge">
                  <span>Principal</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
