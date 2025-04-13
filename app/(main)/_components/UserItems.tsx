import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import * as Dropdown from '@/components/ui/dropdown-menu'
import { SignOutButton, useUser } from '@clerk/clerk-react'
import { ChevronsLeftRightIcon } from 'lucide-react'
const UserItems = () => {
  const { user } = useUser()
  return (
    <div>
      <Dropdown.DropdownMenu >
        <Dropdown.DropdownMenuTrigger asChild>
          <div role='button' className='flex items-center w-full p-3  text-sm hover:bg-primary/5'>
            <div className='flex items-center gap-x-2 max-w-[150px'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className='text-start line-clamp-1 font-medium'>{user?.fullName}&apos;s Pages</span>
            </div>
            <ChevronsLeftRightIcon className='rotate-90 h-4 w-4 ml-2 text-muted-foreground' />
          </div>
        </Dropdown.DropdownMenuTrigger>
        <Dropdown.DropdownMenuContent
          className='w-80'
          align='start'
          alignOffset={11}
          forceMount
        >
          <Dropdown.DropdownMenuItem>
            <div className=' flex flex-col space-y-4 p-2'>
              
              <div className='flex items-center gap-x-2'>
                <div className='rounded-md bg-secondary p-1'>
                  <Avatar className='h-6 w-6'>
                    <AvatarImage src={user?.imageUrl}/>
                  </Avatar>
                </div>
                <p className='text-xs font-medium leading-none text-muted-foreground'>
                {user?.username ? user?.username : user?.emailAddresses[0].emailAddress }
              </p>
              </div>
            </div>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuItem  asChild className='cursor-pointer w-full text-muted-foreground'>
            <SignOutButton >
              Log out
            </SignOutButton>
          </Dropdown.DropdownMenuItem>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>
    </div>
  )
}

export default UserItems