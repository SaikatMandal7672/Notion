import React from 'react'
import Navbar from './_components/Navbar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full '>
            <Navbar />
            <main className='h-full pt-36 bg-[#edfff5] dark:bg-neutral-950'>
                {children}
            </main>
        </div>
    )
}

export default HomeLayout