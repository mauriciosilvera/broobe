import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { logIn } from "../../../../utils/requests";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const response = await logIn(credentials);

        if (response.token) {
          return response;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  //   debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
