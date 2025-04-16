"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import ImageUploader from "./image-uploader"
import CameraCapture from "./camera-capture"
import ResultCard from "./result-card"
import { Loader2, AlertCircle } from "lucide-react"
import { API_URL } from "@/app/env"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import ApiStatusIndicator from "./api-status-indicator"
import ApiTestButton from "./api-test-button"
import SuccessAnimation from "./success-animation"
import FailureAnimation from "./failure-animation"

type InputMethod = "upload" | "camera"
type PredictionResult = {
  label: "cat" | "dog" | "human"
  confidence?: number
}

type ApiStatus = "unknown" | "connected" | "disconnected" | "checking"

export default function PetClassifier() {
  const [inputMethod, setInputMethod] = useState<InputMethod>("upload")
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<ApiStatus>("unknown")
  const { toast } = useToast()

  const handleImageSelect = (imageData: string) => {
    setImage(imageData)
    setResult(null)
    setError(null)
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setError(null)
  }

  const testApiConnection = async () => {
    try {
      setApiStatus("checking")
      setIsLoading(true)

      const response = await fetch(`${API_URL}/test`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("API test failed")
      }

      const data = await response.json()
      setApiStatus("connected")

      toast({
        title: "API Connection Successful",
        description: data.message || "Connection to the API is working!",
        variant: "default",
        action: <SuccessAnimation />,
      })
    } catch (err) {
      setApiStatus("disconnected")

      toast({
        title: "API Connection Failed",
        description: `Could not connect to the API at ${API_URL}. Please check if it's running.`,
        variant: "destructive",
        action: <FailureAnimation />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-check API status on component mount
  useEffect(() => {
    testApiConnection()
  }, [])

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select or capture an image first")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Convert base64 to blob
      const base64Response = await fetch(image)
      const blob = await base64Response.blob()

      // Create form data
      const formData = new FormData()
      formData.append("file", blob, "image.jpg")

      // Send to API
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      // Handle the API response format which returns {"result":"dog"}
      setResult({
        label: data.result || data.prediction,
        confidence: data.confidence || 0.95, // Default confidence if not provided
      })
    } catch (err) {
      setError("Failed to process the image. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Pet Classifier</h2>
        <ApiStatusIndicator status={apiStatus} />
      </div>

      <Card className="mb-6 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-medium">Image Classification</CardTitle>
          <p className="text-white/80 text-sm">Upload or capture an image to classify</p>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs
            defaultValue="upload"
            value={inputMethod}
            onValueChange={(value) => setInputMethod(value as InputMethod)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="camera">Use Camera</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <ImageUploader onImageSelect={handleImageSelect} selectedImage={image} />
            </TabsContent>
            <TabsContent value="camera">
              <CameraCapture onImageCapture={handleImageSelect} capturedImage={image} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ResultCard image={image} label={result.label} confidence={result.confidence} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          onClick={handleSubmit}
          disabled={!image || isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Classify Image"
          )}
        </Button>

        {image && (
          <Button variant="outline" onClick={handleReset} className="w-full">
            Reset
          </Button>
        )}

        <ApiTestButton
          onClick={testApiConnection}
          status={apiStatus}
          disabled={isLoading || apiStatus === "checking"}
        />
      </div>
    </motion.div>
  )
}
