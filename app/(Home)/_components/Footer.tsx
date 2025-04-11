import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <div className='flex items-center w-full bg-transparent p-6  z-50'>
      <Logo/>
      <div className='md:ml-auto w-full  justify-between flex md:justify-end items-center gap-x-2'>
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  )
}

export default Footer