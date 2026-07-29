import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/fr/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.includes("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig