import { useRef } from "react";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { IconPicker } from "./IconPicker";
import { Button } from "./ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { ElementRef } from "react";
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}
const Toobar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const upadate = useMutation(api.documents.update);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      setValue(initialData.title);
    }, 0);
  };
  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    upadate({ id: initialData._id, title: value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={() => {}}>
            <p className="text-6xl hover:opacity-65 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={() => {}}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={(icon) => console.log(icon)}>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
            >
              <Smile className="h-4 w-4" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={() => {}}
            className="text-muted-foreground text-xs"
            variant={"outline"}
          >
            <ImageIcon className="h-4 w-4" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(event) => onInput(event.target.value)}
          className=" resize-none bg-transparent outline-none text-5xl font-bold text-[#3f3f3f] break-words dark:text-[#cfcfcf]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="font-bold pb-[11.5px] break-words outline-none text-5xl
        text-[#3f3f3f]  dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

export default Toobar;
