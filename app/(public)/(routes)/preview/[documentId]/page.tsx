"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/components/Toolbar";
import { useParams } from "next/navigation";
import Cover from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/Editor";
import { useQuery } from "convex/react";


const DocumentId = () => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });


  if (document === undefined)
    return (
      <div>
        <Cover.Skeleton />
        <div className="flex flex-col gap-y-2 items-center mt-10">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );
  if (document === null) {
    return <p>Not Found</p>;
  }
  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-5xl  lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor editable={false} initialContent={document.content} onChange={()=>{}} />
      </div>
    </div>
  );
};

export default DocumentId;
