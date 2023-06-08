import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "@/libs/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers:[
    CredentialsProvider({
      name: 'Credentials',
      credentials:{
        email: {label: 'Email', type:'email'},
        password: {label:'Password', type:'password'}
      },
      async authorize(credentials, req) {

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user
      },    
    })
  ],
  // debug: process.env.NODE_ENV === 'development',
  session:{strategy:'jwt'},
  jwt: {secret: process.env.NEXTAUTH_JWT_SECRET},
  secret: process.env.NEXTAUTH_SECRET,
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id
      }
      return token
    },
    async session({session, token}){
      session.user = token
      return session
    }
  }
})


