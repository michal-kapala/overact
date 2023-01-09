import { NonEmptyArray } from "type-graphql";
import { 
  FindManyUserResolver,
  FindManyProductResolver,
  CreateOneProductResolver,
  CreateOneCategoryResolver,
  CreateOneColorResolver,
  FindManyCategoryResolver,
  ProductRelationsResolver,
  FindManyColorResolver,
  CreateOneSizeResolver,
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
  // THIS IS REQUIRED FOR NESTED QUERY RESOLUTION
  ProductRelationsResolver,
  // Category
  FindManyCategoryResolver,
  CreateOneCategoryResolver,
  // Color
  CreateOneColorResolver,
  FindManyColorResolver,
  // Size
  CreateOneSizeResolver,
] as NonEmptyArray<Function>;
