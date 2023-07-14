import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

// console.log({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user}) {
      try {
        if (user) {
          const sessionUser = await User.findOne({ email: user.email });
          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
          }
        }
        return session;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase();

        // Check if user exists
        const userExists = await User.findOne({ email: profile?.email });

        // If not, create user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replaceAll(' ', '').toLowerCase().replaceAll(/[áéíóúÁÉÍÓÚ]/g, (match) => {
              const map = {
                á: 'a',
                é: 'e',
                í: 'i',
                ó: 'o',
                ú: 'u',
              };
              return map[match];
            })
            ,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  },
});

export { handler as GET, handler as POST };