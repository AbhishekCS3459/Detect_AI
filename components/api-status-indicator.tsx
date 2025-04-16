"use client"

import { CheckCircle2, XCircle, HelpCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type ApiStatus = "unknown" | "connected" | "disconnected" | "checking"

interface ApiStatusIndicatorProps {
  status: ApiStatus
}

export default function ApiStatusIndicator({ status }: ApiStatusIndicatorProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "connected":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          label: "API Connected",
          description: "Connection to the API is working properly",
          color: "bg-green-100",
        }
      case "disconnected":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          label: "API Disconnected",
          description: "Cannot connect to the API. Please check if it's running",
          color: "bg-red-100",
        }
      case "checking":
        return {
          icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
          label: "Checking API",
          description: "Testing connection to the API...",
          color: "bg-blue-100",
        }
      default:
        return {
          icon: <HelpCircle className="h-5 w-5 text-gray-500" />,
          label: "API Status Unknown",
          description: "API connection status has not been checked yet",
          color: "bg-gray-100",
        }
    }
  }

  const { icon, label, description, color } = getStatusDetails()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${color}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
            </AnimatePresence>
            <span className="text-sm font-medium">{label}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
