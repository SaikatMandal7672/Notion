'use client'
import EmojiPicker , {Theme} from 'emoji-picker-react'

import { useTheme } from 'next-themes'
import {Popover,PopoverContent,PopoverTrigger} from "./ui/popover"

interface IconPickerProps {
    onChange: (icon: string) => void;
    children:React.ReactNode;
    asChild?:boolean;
}

export const IconPicker =({ onChange, children, asChild }: IconPickerProps) => {
    const {resolvedTheme} = useTheme();
    const currentTheme= (resolvedTheme || "light") as  keyof typeof themeMap

    const themeMap = {
        light: Theme.LIGHT,
        dark: Theme.DARK,
    }

    const theme = themeMap[currentTheme];
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className='p-0 border-none shadow-none bg-transparent'>
                <EmojiPicker 
                onEmojiClick={(emoji) => onChange(emoji.emoji)} 
                theme={theme}  
                height={350} />
            </PopoverContent>

        </Popover>
    )

}