import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from "@models/user";
import { connectToDatabase } from "@utils/database";

// console.log({
//   clientId: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET
// });

interface CustomProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  picture: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      try {
        if (user && session.user) {
          const sessionUser = await User.findOne({ email: session.user.email });
          if (sessionUser) {
            session.user = Object.assign(session.user, { id: sessionUser._id.toString() });
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
          const customProfile = profile as CustomProfile;
          const image = customProfile.picture || '';
          await User.create({
            email: profile?.email,
            username: profile?.name?.replaceAll(' ', '').toLowerCase().replaceAll(/[áéíóúÁÉÍÓÚ]/g, (match) => {
              const map: any = {
                á: 'a',
                é: 'e',
                í: 'i',
                ó: 'o',
                ú: 'u',
              };
              return map[match];
            })
            ,
            image,
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