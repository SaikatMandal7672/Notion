"use client";
import { Doc } from "@/convex/_generated/dataModel";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/useOrigin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, CopyIcon, GlobeIcon } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Publishing page..",
      success: "Page published.. ",
      error: "Failed to publish page..",
    });
  };
  const onUnPublish = () => {
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Unpublishing page",
      success: "Page unpublished.. ",
      error: "Failed to unpublish page..",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"sm"} variant={"ghost"}>
            Publish
            {initialData.isPublished && (
              <GlobeIcon className="ml-2 h-4 w-4 text-sky-500" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-72"
          align="end"
          alignOffset={10}
          forceMount
        >
          {!initialData.isArchived && initialData.isPublished ? (
            <div className="space-y-4">
                <div className="flex items-center gap-x-2">
                    <GlobeIcon className="h-4 w-4 animate-pulse  text-sky-500" />
                    <p className="font-medium text-xs text-sky-500"> This page is available to others. </p>
                </div>
                <div className="flex items-center ">
                    <input value={url} className="flex-1 px-2 text-xs  border round-l-md h-8 bg-muted truncate "
                    disabled
                    />
                    <Button 
                      onClick={onCopy}
                      disabled={copied}
                      className="h-8 rounded-l-none"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 "/>
                      ):(
                        <CopyIcon className="h-4 w-4" />
                      )}
                    </Button>
                </div>
                <Button size={"sm"} className="w-full  text-xs " disabled={isSubmitting}
                onClick={onUnPublish}>Unpublish </Button>
            </div>
          ) : (
            <div className="flex flex-col  justify-center items-center">
              <GlobeIcon className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm mb-2 font-medium">Publish this page</p>
              <span className="mb-4 text-xs text-muted-foreground">
                Share your work with others.
              </span>
              <Button
                disabled={isSubmitting}
                onClick={onPublish}
                className="w-full text-xs "
                size="sm"
              >
                Publish
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Publish;
