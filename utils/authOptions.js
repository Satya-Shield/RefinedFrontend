// Ye file hum nahi use karre everything managed by auth.js

import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/config/database"
import User from "@/models/User"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // 1️⃣ Sign in logic
    async signIn({ profile }) {
      await connectDB()

      const userExists = await User.findOne({ email: profile.email })

      if (!userExists) {
        let baseUsername = profile.name
          .slice(0, 20)
          .replace(/\s+/g, "")
          .toLowerCase()
        let username = baseUsername
        let i = 1

        while (await User.findOne({ username })) {
          username = `${baseUsername}${i++}`
        }

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        })
      }

      return true
    },

    // 2️⃣ Session enrichment
    async session({ session }) {
      await connectDB()
      const user = await User.findOne({ email: session.user.email })
      session.user.id = user?._id?.toString() || null
      return session
    },
  },
}
