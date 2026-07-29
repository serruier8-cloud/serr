"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "motion/react"

interface AnimatedCounterProps {
  from?: number
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const range = to - from

    function update(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(from + range * eased)
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [isInView, from, to, duration])

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString()

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
