'use client'

import {
    DialogContent,
    Dialog ,
    DialogHeader
} from "@/components/ui/dialog"

import { useUserSettings } from "@/hooks/userSettings";
import { Label } from "../../components/ui/label"
import { ModeToggle } from "../../components/toggle-mode"

export const SettingsModal = () => {
    const settings = useUserSettings()

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent >
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium"> My settings</h2>
                </DialogHeader>
                <div className="flex items-center justify-center gap-x-2">
                   <div className="flex flex-col gap-y-1">
                    <Label>Appearance</Label>
                    <span className="text-sm text-muted-foreground">Customise the appearance of your app</span>
                   </div>
                   <ModeToggle />
                </div>
                
            </DialogContent>

        </Dialog>
    )
}