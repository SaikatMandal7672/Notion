'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>

      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
      Your Ideas , Docs and Plans. Unified. Welcome to <span className='underline'>Nawtion</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        A connected workspace where <br />
        you work faster and better.
      </h3>
      <Button className='text-lg p-4 bg-blue-500 hover:bg-blue-500/80'>
        Enter Nawtion
        <ArrowRight className='h-4 w-4 '/>
      </Button>

    </div>
  )
}

export default Heading