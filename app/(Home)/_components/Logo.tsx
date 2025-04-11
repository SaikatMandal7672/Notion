import Image from "next/image"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2 mr-4">
      <Image
        alt="logo"
        src="/logo.svg"
        height={40}
        width={40}
        className="dark:hidden"
      ></Image>
      <Image
        alt="logo"
        src="/logo-dark.svg"
        height={40}
        width={40}
        className="hidden dark:block"
      ></Image>
      <p className={cn("font-semibold", font.className)}>Pages</p>
    </div>
  )
}

export default Logo