import { allow, shield } from "graphql-shield";
import { isAdmin } from "./rules/isAdmin";

/**
 * Overact's GraphQL API access permissions schema.
 */
export const permissions = shield(
  {
    Query: {
      users: isAdmin,
      products: allow,
      categories: allow,
    },
    Mutation: {
      createOneProduct: isAdmin,
      createOneCategory: isAdmin,
    },
  },
  { allowExternalErrors: true, }
);
