'use client'
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Items from './Items';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';


interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">
}


const DocumentList = ({
    parentDocumentId,
    level = 0,
}: DocumentListProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const onExpand = (documentId: string) => {
        setExpanded(e => (
            
            {
            ...e, [documentId]: !e[documentId]
        }))
    }

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    });
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }
    if (documents === undefined) {
        return (
            <>
                <Items.Skeleton level={level} />
                {level === 0 &&
                    <>
                        <Items.Skeleton level={level} />
                        <Items.Skeleton level={level} />

                    </>}
            </>
        )
    }
    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${level * 12 + 12}px` : undefined
                }}
                className={cn(
                    "hidden text-medium font-medium text-muted-foreground/80 ml-4",
                    expanded && "last:block",
                    level == 0 && "hidden"

                )}
            >
                No pages inside
                
            </p>
            {documents?.map((d) => (
                <div key={d._id}>
                    <Items
                        id={d._id}
                        label={d.title}
                        onClick={() => onRedirect(d._id)}
                        icon={FileIcon}
                        documentIcon={d.icon}
                        active={params.documentId === d._id}
                        level={level}
                        onExpand={() => onExpand(d._id)}
                        expanded={expanded[d._id]}
                    />
                    {
                        expanded[d._id] && (
                            <DocumentList
                                parentDocumentId={d._id}
                                level={level + 1}
                            />
                        )
                    }
                </div>
            ))}
        </>
    )
}

export default DocumentList