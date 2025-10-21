import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDB from "@/config/database"
import User from "@/models/User"

export const { handlers: { GET, POST }, auth, signIn, signOut } = 
NextAuth({
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
    async signIn({ profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.replace(/\s+/g, "").toLowerCase();
        
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }
      return true;
    },
    async session({ session }) {
      // jab hum useSession call karenge tab ye run hoga 
      // 1. Connect to the database
      await connectDB(); 
      // 2. Find the user in the database
      const user = await User.findOne({ email: session.user.email });
      // 3. Assign the user ID to the session
      if (user) {
        session.user.id = user._id.toString();
      }
      // 4. Return the updated session
      return session;
    },
  },
});