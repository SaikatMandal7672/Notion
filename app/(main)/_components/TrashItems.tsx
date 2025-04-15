'use cient'
import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api';
import React, { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Spinner } from '@/components/spinner';
import { Search, Trash2, Undo2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AlertDialogBox } from './AlertDialog';

const TrashItems = () => {

    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("")
    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        router.push(`/docmunents/${documentId}`)
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) => {
        event.stopPropagation()
        const promise = restore({ id: documentId });
        toast.promise(promise, {
            loading: "Restoring pages ..🤗",
            success: "Page restored 😊",
            error: "Failed to restore page 😥"
        })
    }
    const onRemove = (
        documentId: Id<"documents">
    ) => {

        const promise = remove({ id: documentId });
        toast.promise(promise, {
            loading: "Removing page ..🤗",
            success: "Page removed 😊",
            error: "Failed to remove page 😥"
        })
        if (params.documentId === documentId) {
            router.push('/documents')
        }
    }

    if (documents === undefined) {
        return (
            <div className='h-full flex items-center justify-center p-4'>
                <Spinner size="lg" />
            </div>
        )
    }
    return (
        <div className='tetx-sm'>
            <div className='flex items-center gap-x-1'>
                <Search className='h-4 w-4' />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='h-7 px-2 bg-secondary focus-visible:ring-transparent'
                    placeholder='Filter by title'
                />
            </div>
            <div className='mt-2 px-1 '>
                <p
                    className='hidden last:block text-xs text-center text-muted-foreground pb-2'
                >No documents found.</p>
                {
                    filteredDocuments?.map((doc) => (
                        <div
                            key={doc._id}
                            className="px-2 py-1 border-b cursor-pointer hover:bg-primary/5 rounded-md text-sm text-primary/80"

                        >
                            <div className="flex justify-between items-center">
                                <span
                                    className='truncate'
                                    onClick={() => onClick(doc._id)}
                                >{doc.title}</span>
                                <div className="flex gap-x-2">
                                    <div
                                        role='button'
                                        className="p-1 rounded-lg text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                        onClick={(e) => onRestore(e, doc._id)}
                                    >
                                        <Undo2 className='h-4 w-4' />
                                    </div>
                                    <div
                                        role='button'
                                        className="p-1 h-full rounded-lg text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600"

                                    >

                                        <AlertDialogBox onConfirm={() => onRemove(doc._id)}>
                                            <Trash2 className='h-4 w-4'/>
                                        </AlertDialogBox >
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default TrashItems