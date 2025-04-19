
'use client'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
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
  }, [document, router])
  return (
    <div>{params.documentId}</div>
  )
}

export default DocumentId