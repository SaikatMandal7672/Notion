'use client'
import React from 'react'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { MenuIcon } from 'lucide-react'
import Title from './Title'

interface NavbaProps {
  isCollapsed: boolean,
  isResetWidth: () => void
}
const Navbar = ({ isCollapsed, isResetWidth }: NavbaProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">
  });


  if (document === undefined) return <nav className='dark:bg-[#1f1f1f1] px-3 py-2 w-full flex items-center gap-x-4'>
  <Title.Skeleton/>
</nav>;
  if (document === null) {
    return null
  }
  return (
    <>
      <nav className=' dark:bg-[#1f1f1f1] px-3 py-2 w-full flex items-center gap-x-4'>
        {
          isCollapsed &&
          <MenuIcon
            role='button'
            onClick={isResetWidth}
            className='cursor-pointer w-6 h-6 text-primary transition-all ease-in-out duration-300'
          />
        }

        <div className='flex items-center w-full '>
          <Title initialData={document} />
        </div>

      </nav>
    </>
  )
}

export default Navbar