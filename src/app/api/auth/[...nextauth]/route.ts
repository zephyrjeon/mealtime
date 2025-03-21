import { MongoDBAdapter } from '@auth/mongodb-adapter';
import 'next-auth';
import NextAuth, { getServerSession, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { appConfigs } from '~/server/configs/getAppConfigs';
import { db } from '~/server/db/db';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}

const authOptions = {
  adapter: MongoDBAdapter(db.mongoClient),
  providers: [
    GoogleProvider({
      clientId: appConfigs.GOOGLE_CLIENT_ID,
      clientSecret: appConfigs.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email!;
        session.user.name = user.name!;
        session.user.image = user.image!;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
