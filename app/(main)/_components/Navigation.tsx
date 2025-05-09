"use client";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircleIcon,
  Search,
  Settings2,
  Trash,
} from "lucide-react";
import React, { ComponentRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useParams, usePathname } from "next/navigation";
import { useMutation } from "convex/react";

import UserItems from "./UserItems";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import Items from "./Items";
import { toast } from "sonner";
import DocumentList from "./DocumentList";
import Navbar from "./Navbar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashItems from "./TrashItems";
import { useSearch } from "@/hooks/useSearch";
import { useUserSettings } from "@/hooks/userSettings";
import { ModeToggle } from "@/components/toggle-mode";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const settings = useUserSettings();
  const router = useRouter()
  const params = useParams();
  const search = useSearch();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isRezisingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null);
  const navbarRef = useRef<ComponentRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const createPromise = create({ title: "Untitled" })
        .then((documentId)=>{router.push(`/documents/${documentId}`)});
    toast.promise(createPromise, {
      loading: "Loading...😴",
      success: "New page created 🤩",
      error: "Failed to create new page🫠",
    });
    
  };

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      handleCollapse();
    }
  }, [isMobile, pathname]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    isRezisingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isRezisingRef.current) return;
    let newWidth = event.clientX;
    if (
      navbarRef.current &&
      sidebarRef.current &&
      newWidth < 480 &&
      newWidth > 240
    ) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
    if (event.clientX < 240) newWidth = 240;
    if (event.clientX > 280) newWidth = 480;
  };

  const handleMouseUp = () => {
    isRezisingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    setIsResetting(true);
    setIsCollapsed(false);
    if (navbarRef.current && sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
    }
    setTimeout(() => setIsResetting(false), 300);
  };

  const handleCollapse = () => {
    setIsCollapsed(true);
    setIsResetting(true);
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full overflow-y-auto bg-zinc-100 dark:bg-zinc-800 relative flex flex-col w-60 z-[99999999]  ",
          isResetting && "transition-all ease-in-out duration-300 ",
          isMobile && "w-0 absolute"
        )}
      >
        <div
          role="button"
          onClick={handleCollapse}
          className={cn(
            "absolute text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600  h-6 w-6 rounded-sm top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-100 cursor-pointer",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <UserItems />
        <Items label="Search " icon={Search} isSearch onClick={search.toggle} />
        <Items label="Settings " icon={Settings2} onClick={settings.onOpen} />
        <Items label="New Page" onClick={handleCreate} icon={PlusCircleIcon} />
        <div className="mt-4">
          <DocumentList />
          <Items label="Add new page" icon={Plus} onClick={handleCreate} />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Items icon={Trash} label="Trash" />
            </PopoverTrigger>
            <PopoverContent
              className="z-[99999999] w-80"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashItems />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition absolute cursor-ew-resize h-full w-1.5 bg-sidebar-foreground right-0 top-0"
        />
        <div className="relative z-[9999999] bottom-[-50%] ml-3">
          <ModeToggle />
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 w-[calc(100%-240px)] z-[999999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0 "
          // !isCollapsed && 'hidden'
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} isResetWidth={resetWidth} />
        ) : (
          <nav className={cn("bg-transparent px-3 py-2 ")}>
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="cursor-pointer w-6 h-6 text-primary transition-all ease-in-out duration-300"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
