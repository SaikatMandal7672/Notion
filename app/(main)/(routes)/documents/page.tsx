'use client'
import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react';
import { ShimmerButton } from "@/components/magicui/shimmer-button";





const Documents = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const createPromise = create({ title: "Untitled" })
    toast.promise(createPromise, {
      loading: 'Loading...😴',
      success: "New page created 🤩",
      error: 'Failed to create new page🫠',
    });
  }
  return (
    <div
      className='h-full flex items-center justify-center flex-col space-y-4'
    >
      
      <Image
        src="/blank-dark.png"
        alt='blank'
        height={400}
        width={400}
        className='hidden dark:block'
      />
      <Image
        src="/blank-light-2.png"
        alt='blank'
        height={400}
        width={400}
        className=' dark:hidden'
      />

      <h2 className='text-lg  font-medium'>Welcome to {user?.firstName}&apos;s Pages</h2>
      <ShimmerButton
        onClick={onCreate}
        className='dark:text-white  ' background='#001d3d' shimmerColor='#80ffdb'
        shimmerSize='0.1rem'
      >
        <PlusCircle className='h-6 w-6 mr-2' />
        Create new Page
      </ShimmerButton>

    </div>
  )
}

export default Documents