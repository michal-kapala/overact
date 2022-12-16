import { rule } from "graphql-shield";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]"
import { OveractUser } from "../../types/OveractUser";

/**
 * Grants admin query access based on user's role.
 */
export const isAdmin = rule()(async (parent, args, ctx, info) => {
  const ses = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
  if(ses !== null) {
    var user = ses.user as OveractUser;
    return user.role === "ADMIN";
  }
  return false;
});
