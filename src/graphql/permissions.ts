import { allow, shield } from "graphql-shield";
import { isAdmin } from "./rules/isAdmin";

export const permissions = shield(
    {
        Query: {
            users: isAdmin,
            products: allow,
        }
    },
    { allowExternalErrors: true, }
);
