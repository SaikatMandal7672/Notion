import { Loader2 } from "lucide-react";

import { cva , type VariantProps} from "class-variance-authority"

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants:{
            size:{
                default:"h-4 w-4",
                sm:"h-2 w-2",
                lg:"h-6 w-6",
                icon:"h-10 w-6"
            }
        },
        defaultVariants:{
            size:"default"
        },
    },
);

export const Spinner = ({
    size
}: VariantProps<typeof spinnerVariants>) => {
    return (
        <Loader2 className={cn(spinnerVariants({ size }))} />
    );
};