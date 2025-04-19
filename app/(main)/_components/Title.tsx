'use client'
import { Doc } from '@/convex/_generated/dataModel'
import React from 'react'

interface TitleProps{
    initialData: Doc<"documents">
}
const Title = (initialData: TitleProps) => {
  return (
    <div>
        {JSON.stringify(initialData).toString()}
    </div>
  )
}

export default Title