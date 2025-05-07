import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/clerk-react'

import { useMutation } from 'convex/react'
import { MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'



interface MenuProps {
    docId: Id<"documents">
}
const Menu = ({ docId }: MenuProps) => {
    const { user } = useUser();
    const archive = useMutation(api.documents.archive)
    function onArcive() {
        const promise = archive({ id: docId })
        toast.promise(promise, {
            loading: 'Moving to trash...😴',
            success: "Page moved to trash🥱",
            error: 'Failed to archive note🫠',
        });
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className='p-1 rounded-lg text-secondary hover:text-primary hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    >
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className='w-60 '
                    align="end"
                    alignOffset={8}

                >
                    <DropdownMenuItem onClick={onArcive}>
                        <Trash className='h-4 w-4 mr-2' />
                        <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className='text-xs px-3 py-1'>
                        Last edited by {user?.fullName}
                    </div>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Menu