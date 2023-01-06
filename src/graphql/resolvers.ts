import { NonEmptyArray } from "type-graphql";
import { 
  FindManyUserResolver,
  FindManyProductResolver,
  CreateOneProductResolver,
  CreateOneCategoryResolver,
  CreateOneColorResolver,
  FindManyCategoryResolver,
} from "../../prisma/generated/type-graphql";

/**
 * Overact's available GraphQL API operations.
 */
export const resolvers = [
  // User
  FindManyUserResolver,
  // Product
  FindManyProductResolver,
  CreateOneProductResolver,
  // Category
  FindManyCategoryResolver,
  CreateOneCategoryResolver,
  // Color
  CreateOneColorResolver,
] as NonEmptyArray<Function>;
