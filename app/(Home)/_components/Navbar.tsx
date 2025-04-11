'use client'
import useScrollTop from '@/hooks/useScrollTop'
import { cn } from '@/lib/utils'


import React from 'react'
import Logo from './Logo'
import { ModeToggle } from '@/components/toggle-mode'
import Link from 'next/link'
import { GithubIcon, LucideLinkedin } from 'lucide-react'
import { useConvexAuth } from 'convex/react'
import { UserButton } from '@clerk/clerk-react'
import { SignInButton } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'


const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop(70);

  return (
    <div
      className={cn(
        "z-50 w-full dark:bg-neutral-950/70 bg-white/70 fixed px-6 py-4 backdrop-blur-md  flex items-center justify-between transition-all duration-300",
        scrolled && "border-b dark:bg-neutral-900/70 shadow-sm rounded-3xl mt-2 transition-all duration-300"
      )}>
      <div className='flex gap-3 items-center text-lg'>
        <Logo />
        <Link
          className="flex gap-x-1 items-center ml-5" target="_blank" rel="noopener noreferrer"
          href="https://github.com/SaikatMandal7672">
          <span className='hidden md:block'>GitHub</span>
          <GithubIcon height={20} width={20} />
        </Link>
        <Link
          className="flex gap-x-1 items-center" target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/saikat-mandal-b9b2a3230/">
          <span className='hidden md:block'>LinkedIn</span>
          <LucideLinkedin height={20} width={20} />
        </Link>
      </div>
      <div className='md:ml-auto  md:justify-end flex items-center gap-x-2 '>
        {
          isLoading && (
            <Spinner size="lg" />
          )
        }
        {
          !isAuthenticated && !isLoading && (
            <>
              <SignInButton mode='modal'>
                <Button variant="secondary" className='bg-emerald-100 dark:text-emerald-700 cursor-pointer dark:hover:text-emerald-200' >Sign In</Button>
              </SignInButton>
            </>
          )
        }
        {
          isAuthenticated && !isLoading && (
            <>

              <Link className='bg-cyan-50/90 dark:bg-white/80 font-semibold dark:text-black px-4 py-2 flex items-center rounded-md'
                href="/documents">
                Enter Nawtion
              </Link>
              <UserButton />


            </>
          )
        }
        <ModeToggle />
      </div>

    </div>
  )
}

export default Navbar