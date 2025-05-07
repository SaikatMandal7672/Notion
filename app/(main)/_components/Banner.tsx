'use client'
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import React from 'react'
import { Button } from '@/components/ui/button';


interface BannerProps {
    docId: Id<"documents">;
}
const Banner = ({ docId }: BannerProps) => {
    const router = useRouter()
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);
    const onRemove = () => {
        const promise = remove({ id: docId });
        toast.promise(promise, {
            loading: "Removing page ..🤗",
            success: "Page removed 😊",
            error: "Failed to remove page 😥"
        })
        router.push('/documents')
    }
    const onRestore = () => {
        const promise = restore({ id: docId });
        toast.promise(promise, {
            loading: "Restoring page ..🤗",
            success: "Page restored 😊",
            error: "Failed to restore page 😥"
        })
        router.push(`/documents/${docId}`)
    }
    return (
        <div className='dark:bg-rose-800/70  bg-rose-400 flex flex-col items-center justify-center text-sm text-white h-auto py-2 gap-x-2 gap-y-1 sm:flex-row'>
            <p>This page is in Trash</p>
            <div className='flex gap-x-2'>
                <Button
                    size={'sm'}
                    onClick={onRestore}
                    className='h-auto px-2 py-1 rounded-sm border-2 hover:border-white bg-rose-600/20 text-white hover:bg-rose dark:hover:bg-rose-700 '
                >Restore Page</Button>
                <Button
                    size={'sm'}
                    onClick={onRemove}
                    className='h-auto px-2 py-1 rounded-sm border-2 bg-rose-600/20 hover:border-white text-white hover:bg-rose dark:hover:bg-rose-600 '
                >Delete Permanently</Button>
            </div>
        </div>
    )
}

export default Banner