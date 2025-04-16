"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cat, Dog, User } from "lucide-react"
import { motion } from "framer-motion"

interface ResultCardProps {
  image: string
  label: "cat" | "dog" | "human"
  confidence?: number
}

export default function ResultCard({ image, label, confidence }: ResultCardProps) {
  const getIcon = () => {
    switch (label) {
      case "cat":
        return <Cat className="h-5 w-5" />
      case "dog":
        return <Dog className="h-5 w-5" />
      case "human":
        return <User className="h-5 w-5" />
    }
  }

  const getColor = () => {
    switch (label) {
      case "cat":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "dog":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "human":
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getGradient = () => {
    switch (label) {
      case "cat":
        return "from-purple-500 to-fuchsia-600"
      case "dog":
        return "from-amber-500 to-orange-600"
      case "human":
        return "from-blue-500 to-cyan-600"
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg border-0">
      <CardHeader className={`bg-gradient-to-r ${getGradient()} text-white`}>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Classification Result</span>
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
            <span className="flex items-center gap-1">
              {getIcon()}
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={image || "/placeholder.svg"}
              alt={`Classified as ${label}`}
              className="w-full h-48 object-contain bg-white"
            />
          </div>

          {confidence !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Confidence</span>
                <span className="text-sm font-medium text-gray-700">{(confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-2.5 rounded-full bg-gradient-to-r ${getGradient()}`}
                ></motion.div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
