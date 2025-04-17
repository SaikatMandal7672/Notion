'use client'

import React, { useEffect, useState } from "react"
import { File } from "lucide-react"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command"
import { useSearch } from "@/hooks/useSearch"

import {api} from "@/convex/_generated/api"


export const SearchCommand = () => {
    const router = useRouter();
    const {user} = useUser();
    const documents = useQuery(api.documents.getSearch);

    const toggle = useSearch((state) => state.toggle);
    const isOpen = useSearch((state) => state.isOpen);
    const onClose = useSearch((state) => state.onClose);
    const onOpen = useSearch((state) => state.onOpen);

    const [isMounted , setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if(!isMounted) return null; 
    
}