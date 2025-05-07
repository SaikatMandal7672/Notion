
'use client'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import Toolbar from '@/components/Toobar';
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const DocumentId = () => {
  const router = useRouter();
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">
  })

  useEffect(() => {
    if (document?.isArchived) {
      router.push('/documents')
    }
  }, [])
  if (document === undefined) return (
    <p>Loading...</p>
  );
  if (document === null) {
    return <p>Not Found</p>
  }
  return (
    <div className='pb-40'>
      <div className="h-[35vh]"/>
      <div className="md:max-w-5xl  lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        {/* <Editor initialData={document} /> */}
      </div>
    </div>
  )
}

export default DocumentId