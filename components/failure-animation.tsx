"use client"

import { motion } from "framer-motion"
import { XCircle } from "lucide-react"

export default function FailureAnimation() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-red-100"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <XCircle className="h-6 w-6 text-red-500" />
      </motion.div>
    </motion.div>
  )
}
