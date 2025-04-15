import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';


import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    MoreHorizontal,
    Plus,
    Trash
} from 'lucide-react';
import { toast } from 'sonner';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/clerk-react';

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    label: string;
    onExpand?: () => void
    icon: LucideIcon;
    onClick?: () => void
}
const Items = ({
    label, icon: Icon, onClick,
    active, documentIcon, expanded, isSearch,
    level = 0, onExpand, id
}: ItemProps) => {

    const {user} = useUser()
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const create = useMutation(api.documents.create)
    const archive = useMutation(api.documents.archive)

    const router = useRouter()
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.()
    }

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const createPromise = archive({id})

        toast.promise(createPromise, {
            loading: 'Moving to trash...😴',
            success: "Page moved to trash🥱",
            error: 'Failed to archive note🫠',
        });
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!id) return;
        const createPromise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                // router.push(`/douments/${documentId}`)
            })
        toast.promise(createPromise, {
            loading: 'Loading...😴',
            success: "New page created 🤩",
            error: 'Failed to create new page🫠',
        });
    }
    return (
        <div
            onClick={onClick}
            role='button'
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : '12px'
            }}
            className={cn(
                'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer transition-colors duration-200',
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role='button'
                    className='h-full rounded-sm bg-neutral-200 hover:bg-zinc-600 dark:hover:bg-neutral-300 dark:bg-neutral-800 mr-1 border dark:border-neutral-800  border-neutral-300 transition-all duration-200'
                    onClick={handleExpand}
                >
                    <ChevronIcon className='h-4 w-4 shrink-0 text-neutral-800 hover:text-neutral-300 dark:text-neutral-300 dark:hover:text-neutral-900' />
                </div>
            )}
            {documentIcon ?
                (<div className='shrink-0 text-[18px] mr-2'>{documentIcon}</div>)
                :
                (<Icon className='shrink-0 h-[20px] mr-2 text-muted-foreground' />)
            }
            <span className='truncate'>{label}</span>
            {isSearch && (
                <kbd className='ml-auto poiner-events-none 
                inline-flex  select-none items-end h-5 gap-1 rounded border p  px-1.5 bg-secondary font-mono font-medium  opacity-100'>
                    <span className='text-xs'>⌘ </span>K
                </kbd>
            )}

            {
                !!id && (
                    <div className='ml-auto flex items-center gap-x-2'>
                        <DropdownMenu  >
                            <DropdownMenuTrigger
                                asChild
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                <div role='button'
                                    className='group-hover:opacity-100 opacity-0 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
                                >
                                    <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-60'
                                align='start'
                                side='right'
                                forceMount
                            >
                                < DropdownMenuItem
                                    onClick={onArchive}
                                    className='cursor-pointer'
                                >
                                    <Trash className='h-4 w-4 mr-2' />Archive Page
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className='text-xs px-3 py-1'>
                                    last edited by {user?.fullName}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div
                            role='button'
                            onClick={onCreate}
                            className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                            <Plus className='h-4 w-4' />
                        </div>
                    </div>
                )
            }

        </div>
    )
}
Items.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : '12px'
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className=' h-4 w-4' />
            <Skeleton className=' h-4 w-[30%]' />
        </div>
    );
}
export default Items