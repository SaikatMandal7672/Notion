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

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);
  const onRemove = () => {
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
          <div className="">
            <Image
              src={url}
              fill
              alt="Cover"
              className="object-cover bg-inherit group absolute"
            />
            <Button
              onClick={()=>console.log("button clicked")}
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 m-2 z-50"
            >
              <X className=" border border-muted-foreground text-muted-foreground rounded-sm" />
              Remove
            </Button>
            <Button
              onClick={coverImage.onOpen}
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 my-2 z-50"
            >
              <ImageIcon className=" border border-muted-foreground text-muted-foreground rounded-full" />
              Change image
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cover;
