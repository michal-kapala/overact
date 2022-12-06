import { rule } from "graphql-shield";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]"

export const isAdmin = rule()(async (parent, args, ctx, info) => {
    const ses = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    //console.info(`unstable_ses: ${JSON.stringify(ses)}`);
    if(ses !== null)
        return ses.user?.role === "ADMIN";

    return false;
});
