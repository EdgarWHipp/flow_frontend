"use client"

import { AnimatePresence } from "framer-motion"
import PageTransition from "@/components/PageTransition"

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>{children}</PageTransition>
    </AnimatePresence>
  )
}