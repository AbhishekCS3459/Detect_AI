"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function SuccessAnimation() {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-green-100"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.3 }}>
        <CheckCircle className="h-6 w-6 text-green-500" />
      </motion.div>
    </motion.div>
  )
}
