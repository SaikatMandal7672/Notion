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
        "z-50 fixed top-0 left-0 right-0 px-2 py-1 md:px-6 md:py-4 backdrop-blur-md flex items-center justify-between transition-all duration-300 mx-auto",
        scrolled
          ? " mx-auto w-[95%] border-b shadow-sm rounded-full mt-2 dark:bg-neutral-900/70 bg-white/70 transition-all duration-300"
          : "w-full dark:bg-neutral-950/70 bg-[#edfff5]/70  transition-all duration-300"
      )}
    >
      <div className='flex gap-3 items-center text-lg'>
        <Logo />
        <Link
          className="flex gap-x-1 items-center ml-5 text-xs md:text-sm" target="_blank" rel="noopener noreferrer"
          href="https://github.com/SaikatMandal7672">
          <span className='hidden md:block'>GitHub</span>
          <GithubIcon height={15} width={15} />
        </Link>
        <Link
          className="flex gap-x-1 items-center text-xs md:text-sm" target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/saikat-mandal-b9b2a3230/">
          <span className='hidden md:block'>LinkedIn</span>
          <LucideLinkedin height={15} width={15} />
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
                <Button variant="secondary" className='border dark:border-white hover:bg-zinc-900 hover:text-zinc-50 md:px-4  md:py-2 px-2 py-1 rounded-md dark:hover:bg-neutral-50 dark:hover:text-neutral-950 transition-all duration-300'  >Sign In</Button>
              </SignInButton>
            </>
          )
        }
        {
          isAuthenticated && !isLoading && (
            <>

              <Link className='border dark:border-white hover:bg-zinc-900 hover:text-zinc-50 md:px-4  md:py-2 px-2 py-1 rounded-md dark:hover:bg-neutral-50 dark:hover:text-neutral-950 transition-all duration-300'
                href="/documents">
                Enter Pages
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