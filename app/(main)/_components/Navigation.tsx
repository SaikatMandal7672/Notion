'use client'
import { ChevronsLeft, MenuIcon } from 'lucide-react'
import React, { ComponentRef, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation';


const Navigation = () => {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width:768px)")
  const isRezisingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<"aside">>(null)
  const navbarRef = useRef<ComponentRef<"div">>(null)

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile)


  useEffect(() => {
    if (isMobile) {
      handleCollapse()
    }
    else {
      resetWidth();
    }
  }, [isMobile])
  useEffect(() => {
    if (isMobile) {
      handleCollapse()
    }


  }, [isMobile, pathname])
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    isRezisingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isRezisingRef.current) return;

    let newWidth = event.clientX;
    if (navbarRef.current && sidebarRef.current && newWidth < 480 && newWidth > 240) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty("left", `${newWidth}px`)
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
    if (event.clientX < 240) newWidth = 240;
    if (event.clientX > 280) newWidth = 480;

  }
  const handleMouseUp = () => {
    isRezisingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

  }
  const resetWidth = () => {
    setIsResetting(true);
    setIsCollapsed(false);

    if (navbarRef.current && sidebarRef.current) {
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("width",
        isMobile ? "0" : "calc(100%-240px)"
      );
      navbarRef.current.style.setProperty("left",
        isMobile ? "100%" : "240px"
      );
    }
    setTimeout(() => setIsResetting(false), 300);
  }
  const handleCollapse = () => {

    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full overflow-y-auto bg-secondary relative flex flex-col w-60 z-[99999] transition-all duration-300 ease-out ',
          isResetting && "transition-all ease-in-out duration-300 ",
          isMobile && "w-0"

        )}
      >
        <div role='button'
          onClick={handleCollapse}
          className={cn(
            'absolute text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600  h-6 w-6 rounded-sm top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-150 cursor-pointer',
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div>
          action items
        </div>
        <div className='mt-4'>
          <p>Docs</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition absolute cursor-ew-resize h-full w-2 bg-secondary right-0 top-0' />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 w-[calc(100%-240px)] z-[999999] ",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-full left-0 "
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && (<MenuIcon onClick={resetWidth} role='button' className='cursor-pointer w-6 h-6 text-black' />)}
        </nav>
      </div>
    </>
  )
}

export default Navigation