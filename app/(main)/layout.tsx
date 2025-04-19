'use client'
import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react'

import { useRouter } from 'next/navigation';
import React from 'react'
import Navigation from './_components/Navigation';
import { SearchCommand } from '@/components/searchCommand';

function MainLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();
    if (isLoading) {
        return (
            <div className='h-full flex justify-center items-center'>
                <Spinner size="icon" />
            </div>
        )
    }
    if (!isAuthenticated) {
        router.replace("/");
    }
    return (
        <div className='h-full dark:bg-zinc-950 bg-zinc-200 flex items-center '>
            <Navigation />
            <div className='flex-1 h-full overflow-y-auto '>
                <SearchCommand />
               {children}
            </div>

        </div>
    )
}

export default MainLayout