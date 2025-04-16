"use client"

import { useState, useRef, useCallback } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Camera, RefreshCw } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void
  capturedImage: string | null
}

export default function CameraCapture({ onImageCapture, capturedImage }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const isMobile = useMobile()

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      onImageCapture(imageSrc)
    }
  }, [webcamRef, onImageCapture])

  const handleRetake = () => {
    onImageCapture("")
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: isMobile ? "environment" : "user",
  }

  return (
    <div className="w-full">
      {!capturedImage ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden shadow-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={() => setIsCameraReady(true)}
              className="w-full h-full object-cover"
            />
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                  <p>Loading camera...</p>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleCapture}
            disabled={!isCameraReady}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt="Captured"
              className="w-full h-64 object-contain bg-white"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <Button variant="outline" onClick={handleRetake} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Take Another Photo
          </Button>
        </motion.div>
      )}
    </div>
  )
}
