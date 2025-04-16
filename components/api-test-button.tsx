"use client"

import { Button } from "@/components/ui/button"
import { Loader2, Activity } from "lucide-react"
import { motion } from "framer-motion"

type ApiStatus = "unknown" | "connected" | "disconnected" | "checking"

interface ApiTestButtonProps {
  onClick: () => void
  status: ApiStatus
  disabled: boolean
}

export default function ApiTestButton({ onClick, status, disabled }: ApiTestButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
      <Button
        variant="secondary"
        onClick={onClick}
        disabled={disabled}
        className="w-full relative overflow-hidden group"
      >
        <span className="flex items-center justify-center">
          {status === "checking" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Connection...
            </>
          ) : (
            <>
              <Activity className="mr-2 h-4 w-4" />
              Test API Connection
            </>
          )}
        </span>

        <motion.span
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ width: "0%" }}
          animate={{
            width: status === "checking" ? "100%" : "0%",
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </Button>
    </motion.div>
  )
}
