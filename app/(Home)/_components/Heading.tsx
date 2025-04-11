'use client'


import { AuroraText } from '@/components/magicui/aurora-text'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'


import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className='max-w-3xl space-y-4'>

      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas , Docs and Plans. Unified. Welcome to
        <div className="text-center text-4xl bg-background font-bold mt-0 tracking-tight md:text-5xl lg:text-7xl">
          <AuroraText speed={2}>Pages </AuroraText>
          

        </div>
      </h1>

      <h3 className='text-base text-muted-foreground sm:text-lg md:text-xl font-medium mb-8 font-sans'>
        <span className='dark:text-[#90e0ef] text-[#00b4d8]'>Pages </span> enables you to create <span className='dark:text-[#d0ffd7] text-[#04de5c] '>organized digital notes</span> that are <span className='text-[#f72585] dark:text-[#ffc6ff]'>easily accessible</span> and
        <span className='dark:text-[#d183fa] text-[#7b2cbf]'> shareable. </span>A
        <span className='dark:text-[#61f2ff] text-[#007ed8]'> connected </span> workspace where you work <span className='dark:text-[#f7b389] text-[#fd0404]'> faster </span> and <span className='dark:text-[#ff60a0] text-[#f0a]'>better.</span>.
      </h3>
      {isLoading &&
        <div className='w-full  flex  justify-center h-6'>
          <Spinner />
        </div>

      }
      {
        !isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button className='text-lg text-white bg-blue-500 shadow-cyan-500/50 shadow-lg hover:bg-blue-500/80'>
                Get started with Pages
              </Button>
            </SignInButton>
          </>
        )
      }
      {
        isAuthenticated &&
        <Button asChild size="lg" className=' text-lg text-white bg-blue-500 shadow-cyan-500/50 shadow-lg hover:bg-blue-500/80'>
          <Link href='/documents'>Continue to your Workspace <ArrowRight className='h-4 w-4 ' /></Link>

        </Button>
      }


    </div>
  )
}

export default Heading