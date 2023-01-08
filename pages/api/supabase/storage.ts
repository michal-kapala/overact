import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { OveractUser } from "../../../src/types/OveractUser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // validate the session
    const ses = await unstable_getServerSession(req, res, authOptions);
    if(ses === null)
      return res.status(401).send("Unauthorized");
    
    // validate the user role
    const userCast = ses.user as OveractUser;
    if(userCast.role !== "ADMIN")
      return res.status(401).send("Unauthorized");

    // return data for Supabase client
    return res.status(200).json({ 
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });
  } else {
    return res.status(405).send("Method not allowed");
  }
}
