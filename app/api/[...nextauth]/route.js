// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // REMOVE THIS LINE: adapter: MongoDBAdapter(clientPromise),
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
  callbacks: {
    async signIn({ profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        let baseUsername = profile.name.slice(0, 20).replace(/\s+/g, "").toLowerCase();
        let username = baseUsername;
        let i = 1;

        while (await User.findOne({ username })) {
          username = `${baseUsername}${i++}`;
        }

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email });

      if (user) {
        session.user.id = user._id.toString();
        session.user.username = user.username;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt", // Important: use JWT since we're not using the adapter
  },
});

export const GET = handlers.GET;
export const POST = handlers.POST;