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
      colors: isAdmin,
      sizes: isAdmin,
    },
    Mutation: {
      // Product
      createOneProduct: isAdmin,
      deleteManyProduct: isAdmin,
      // Category
      createOneCategory: isAdmin,
      // Color
      createOneColor: isAdmin,
      // Size
      createOneSize: isAdmin,
    },
  },
  { allowExternalErrors: true, }
);
