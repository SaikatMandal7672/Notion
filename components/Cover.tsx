"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestrore";
import { Skeleton } from "@/components/ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };
  return (
    <div
      className={cn(
        "relative h-[45vh] group w-full mt-12",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <>
          <div>
            <Image src={url} fill alt="Cover" className="object-cover" />
            {url && !preview && (
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                <Button onClick={onRemove} variant="secondary" className="">
                  <X className=" border border-muted-foreground text-muted-foreground rounded-sm" />
                  Remove
                </Button>
                <Button
                  onClick={()=>coverImage.replaceImage(url)}
                  variant="secondary"
                  className=""
                >
                  <ImageIcon className=" border border-muted-foreground text-muted-foreground rounded-full" />
                  Change image
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton(){
  return (
    <Skeleton className="w-full h-[12vh]"/>
  )
}

export default Cover;
