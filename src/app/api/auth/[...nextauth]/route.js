import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signJwtToken } from "@/lib/jwt";
import db from "@/lib/db";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
import User from "@/models/User";
import jwt from "jsonwebtoken"
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid Input");
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
          throw new Error("Invalid Password");
        } else {
          const { password, ...currentUser } = user._doc;
          const accessToken = signJwtToken(currentUser, { expiresIn: "5d" });

          return {
            ...currentUser,
            accessToken,
            user: {
              _id: currentUser._id,
              accessToken: accessToken,
            },
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = await user.accessToken;
        token._id = await user._id;
      }

      return token;
    },

    async session({ session, token }) {
    
      if (token) {
        // Modify session.user instead of token directly
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
    
      return session;
    }
    
  },

  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

// export const authOptions = {
//   //   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "email" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials) {
//         // check email and password are valid
//         if (!credentials.email || !credentials.password) {
//           return null;
//         }

//         // check if use exist
//         const user = await User.findOne({ email: credentials.email });

//         if (!user) {
//           return null;
//         }

//         // check password matches

//         const passwordsMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!passwordsMatch) {
//           return null;
//         }
//         // return user object if everything is fine
//         return Promise.resolve({
//             email: user.email,
//             // Add other user properties as needed
//             mongoId: user._id, // Assuming MongoDB _id is available in your user model
//           });

//       },
//     }),
//   ],
//   // session: {
//   //   strategy: "jwt",
//   // },
//   callbacks: {
//     async signJwtToken(token, user) {
//       // Set the user's MongoDB _id directly in the token
//       if (user && user.mongoId) {
//         token.mongoId = user.mongoId;
//       }
//       return token;
//     },
//     async session(session, user) {
//       // Set the user's MongoDB _id directly in the session
//       if (user && user.mongoId) {
//         session.user.mongoId = user.mongoId;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXT_AUTH_SECRET,
//   debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
