"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 dark:bg-zinc-950  bg-zinc-200 w-full  h-full">
      <Image src="/error.png" height={320} width={320} alt="error iamge"/>
      <h2>Somenthing went wrong!</h2>
      <Button>
        <Link href="/documents">Go-back</Link>
      </Button>
    </div>
  );
}; 

export default ErrorPage;
