import React  from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/useCoverImage";
import { SingleImageDropzoneUsage } from "@/components/singleImageDropZone";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverImageModal = () => {
  const params = useParams();

  const coverImage = useCoverImage();


  
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogTitle>Cover Image</DialogTitle>
        <DialogHeader>
          <SingleImageDropzoneUsage id={params.documentId as Id<"documents">}/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
