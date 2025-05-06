'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import React, { useRef, useState } from 'react'

interface TitleProps {
  initialData: Doc<"documents">;
}
const Title = ({ initialData }: TitleProps) => {
  const [title, setTitle] = useState(initialData.title)
  const [isEditing, setIsEditing] = useState(false)
  const inputref = useRef<HTMLInputElement>(null)
  const update = useMutation(api.documents.update)

  const enableEditing = () => {
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
      // inputref.current?.focus();
      inputref.current?.setSelectionRange(0, inputref.current.value.length)
    }, 0)
  }

  const disabelEditing = ()=>{
    setIsEditing(false);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    update({ id: initialData._id, title: event.target.value || "Untitled " })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disabelEditing();
    }
  }

  return (
    <>
      <div className='flex items-center gap-x-2 '>
        {!!initialData.icon && (<p>{initialData.icon}</p>)}
        {
          isEditing ? (
            <Input
              autoFocus
              onClick={enableEditing}
              onChange={onChange}
              value={title}
              onKeyDown={onKeyDown}
              ref={inputref}
              className='h-8 text-2xl px-2 focus-visible:ring-transparent'
            />
          )
            : (
              <Button variant={'ghost'}
                className='h-auto font-normal p-1'
                size="lg"
                onClick={ enableEditing }
              >
                <span className='truncate text-lg'>{initialData.title}</span>
              </Button>
            )
        }
      </div>
    </>

  )
}
Title.Skeleton  = function TitleSkeleton() {
  return (
    <div className='flex items-center gap-x-2'>
      <Skeleton className='h-8 w-24' />
    </div>
  )
}
export default Title