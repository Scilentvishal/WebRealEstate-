import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signJwtToken } from "@/lib/jwt";
import db from "@/lib/db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "@/models/User";
import NextAuth from "next-auth";

export const authOptions = {
  //   adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // check email and password are valid
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // check if use exist
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        // check password matches

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsMatch) {
          return null;
        }
        // return user object if everything is fine
        return Promise.resolve({
            email: user.email,
            // Add other user properties as needed
            mongoId: user._id, // Assuming MongoDB _id is available in your user model
          });
  
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt(token, user) {
      // Set the user's MongoDB _id directly in the token
      if (user && user.mongoId) {
        token.mongoId = user.mongoId;
      }
      return token;
    },
    async session(session, user) {
      // Set the user's MongoDB _id directly in the session
      if (user && user.mongoId) {
        session.user.mongoId = user.mongoId;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
