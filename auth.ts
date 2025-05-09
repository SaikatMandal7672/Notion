import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

// Function to sync GitHub user with Convex
async function syncUserWithConvex(user: any) {
  try {
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
    // Check if user exists in Convex
    const existingUser = await client.query(api.users.getByProviderId, {
      providerId: user.id,
      provider: "github"
    })
    
    if (!existingUser) {
      // Create new user in Convex
      await client.mutation(api.users.createFromOAuth, {
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
        providerId: user.id,
        provider: "github"
      })
    }
  } catch (error) {
    console.error("Error syncing user with Convex:", error)
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Sync user with Convex
        await syncUserWithConvex(user)
        
        return {
          ...token,
          providerId: user.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Use the GitHub user ID as the user ID
        session.user.id = token.providerId as string || token.sub as string
      }
      return session
    }
  }
})
