"use client"

import { signIn } from "@/auth"
import { Button } from "./ui/button"
import { GithubIcon } from "lucide-react"
 
export default function SignIn() {
  return (
    <Button 
      onClick={() => signIn("github")} 
      className="flex items-center gap-2"
    >
      <GithubIcon size={16} />
      Sign in with GitHub
    </Button>
  )
}
