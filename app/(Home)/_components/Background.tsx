"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Particles } from "@/components/ui/particles"

export function Background() {
  const { theme } = useTheme()
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "dark" ? "#A4F5CE" : "#000000")
  }, [theme])

  return (
      <div className="">
        <Particles
        className="absolute inset-0 hidden md:block"
        quantity={1000}
        size={0.7}
        ease={40}
        color={color}
        refresh
        vx={0.08}
        vy={0.1}
      />
      <Particles
        className="absolute inset-0 md:hidden"
        quantity={500}
        size={0.7}
        ease={40}
        color={color}
        refresh
      />
      </div>
      
    
  )
}
