import { shield } from "graphql-shield";
import { isAdmin } from "./rules/isAdmin";

export const permissions = shield(
    {
        Query: {
            users: isAdmin
        }
    },
    { allowExternalErrors: true, }
);
