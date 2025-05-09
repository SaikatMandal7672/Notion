"use client";
import React from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "./Publish";

interface NavbaProps {
  isCollapsed: boolean;
  isResetWidth: () => void;
}
const Navbar = ({ isCollapsed, isResetWidth }: NavbaProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined)
    return (
      <nav className="dark:bg-[#1f1f1f1] px-3 py-2 w-full flex items-center gap-x-4">
        <Title.Skeleton />
      </nav>
    );
  if (document === null) {
    return null;
  }
  return (
    <>
      <nav className=" dark:bg-[#1f1f1f1] px-3 py-2 w-full flex items-center gap-x-4 pb-2">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={isResetWidth}
            className="cursor-pointer w-6 h-6 text-primary transition-all ease-in-out duration-300"
          />
        )}

        <div className="flex items-center justify-between w-full ">
          <Title initialData={document} />
          <div className="flex gap-x-2 items-center">
            {!document.isArchived && <Publish initialData={document}/>}
            <Menu docId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner docId={document._id} />}
    </>
  );
};

export default Navbar;
