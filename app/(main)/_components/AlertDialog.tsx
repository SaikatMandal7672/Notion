'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




interface props {
    children: React.ReactNode,
    onConfirm: () => void
}
export function AlertDialogBox({
    children,
    onConfirm
}: props) {

    const handleConfirm = (e:React.MouseEvent)=>{
        e.stopPropagation()
        onConfirm()
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={e => e.stopPropagation}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="transition-all duration-300">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Page and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={e => e.stopPropagation}
                    >Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                    >Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
