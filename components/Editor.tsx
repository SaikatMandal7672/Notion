import React from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { PartialBlock } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestrore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export default function Editor({
  onChange,
  initialContent,
  editable,
}: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const uploadFile = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  };
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile,
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      theme={resolvedTheme == "dark" ? "dark" : "light"}
      editor={editor}
      editable={editable}
      onChange={(editor) => {
        onChange(JSON.stringify(editor.document, null, 2));
      }}
    />
  );
}
