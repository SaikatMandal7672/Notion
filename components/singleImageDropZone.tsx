"use client";

import { SingleImageDropzone } from "@/components/upload/single-image";
import {
  UploaderProvider,
  type UploadFn,
} from "@/components/upload/uploader-provider";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestrore";
import { useMutation } from "convex/react";
import { useCoverImage } from "@/hooks/useCoverImage";
import * as React from "react";

interface props {
  id: Id<"documents">;
}

export function SingleImageDropzoneUsage({ id }: props) {
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);
  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        signal,
        onProgressChange,
      });
      // you can run some server action or api here
      // to add the necessary data to your database
      await update({
        id,
        coverImage: res.url,
      });

      coverImage.onClose();
      console.log(res);
      return res;
    },
    [edgestore]
  );

  return (
    <UploaderProvider uploadFn={uploadFn} autoUpload>
      <SingleImageDropzone
        height={200}
        width={200}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 3, // 1 MB
        }}
      />
    </UploaderProvider>
  );
}
