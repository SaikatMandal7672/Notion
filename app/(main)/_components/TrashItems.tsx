'use cient'
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import { api } from '@/convex/_generated/api';
import React, { useState } from 'react'
import { mutation } from '@/convex/_generated/server';


const TrashItems = () => {

    const router = useRouter();
    const parans = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore= mutation(api.documents.restore);
    const remove = mutation(api.documents.remove) ;

    const [search,setSearch] = useState("")
    const filteredDocuments = documents?.filter((document)=>{
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId:string)=>{
         router.push(`/docmunents/${documentId}`)
    }
    return (
        <div>TrashItems</div>
    )
}

export default TrashItems