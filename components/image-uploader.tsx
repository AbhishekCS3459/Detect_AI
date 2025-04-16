"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void
  selectedImage: string | null
}

export default function ImageUploader({ onImageSelect, selectedImage }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0])
    }
  }

  const handleFiles = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageSelect(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full">
      {!selectedImage ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-purple-300 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="p-4 bg-purple-100 rounded-full">
              <ImageIcon className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-base font-medium text-gray-700">
              Drag and drop an image, or{" "}
              <button
                type="button"
                className="text-purple-600 font-semibold hover:underline focus:outline-none"
                onClick={onButtonClick}
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-500">Supported formats: JPG, PNG, GIF</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-64 object-contain bg-white"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 shadow-lg"
              onClick={() => onImageSelect("")}
            >
              Change Image
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
