"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const LoadingBar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to be larger for higher resolution
    canvas.width = 1000
    canvas.height = 100

    let animationFrameId: number
    let offset = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)

      // Increase the frequency of oscillations
      for (let i = 0; i < canvas.width; i++) {
        ctx.lineTo(i, canvas.height / 2 + Math.sin(i * 0.05 + offset) * 20)
      }

      ctx.strokeStyle = "black"
      ctx.lineWidth = 1
      ctx.stroke()

      offset += 0.2 // Increase speed of animation
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // The canvas is set to a larger size, but we'll display it at a smaller size
  return <canvas ref={canvasRef} style={{ width: "100%", height: "40px" }} />
}

export default LoadingBar

