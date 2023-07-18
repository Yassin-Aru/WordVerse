import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){

    },
    async signIn({profile}) {
        try {
            await connectToDB();

            // check if the user is already exist

            // if not create new user and add it to DB

            return;
        } catch (error) {
            console.log(error);
        }
    }
})