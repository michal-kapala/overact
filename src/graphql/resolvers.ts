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
  FindManySizeResolver,
  SizeRelationsResolver,
  DeleteManyProductResolver,
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
  DeleteManyProductResolver,
  // THIS IS REQUIRED FOR NESTED QUERY RESOLUTION
  ProductRelationsResolver,
  // Category
  FindManyCategoryResolver,
  CreateOneCategoryResolver,
  // Color
  FindManyColorResolver,
  CreateOneColorResolver,
  // Size
  FindManySizeResolver,
  CreateOneSizeResolver,
  SizeRelationsResolver,
] as NonEmptyArray<Function>;
