import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Demo User',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
      },
      async authorize(credentials) {
        // Mock login for demonstration
        if (credentials?.username === 'demo') {
          return {
            id: '1',
            name: 'Demo User',
            email: 'demo@example.com',
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
