import "reflect-metadata";
import { request, gql } from "graphql-request";
import { useQuery, UseQueryResult } from "react-query";
import type { Category } from "../../../../prisma/generated/type-graphql";

/**
 * Response type for 'categories' query.
 */
interface CategoriesResult {
  categories: Category[]
}

const query = gql`
query categories {
    categories {
        id
        name
        tags
    }
}
`;

/**
 * Fetches all categories.
 * @returns Wrapped useQuery results with category list
 */
export function useCategories(apiUrl: string): UseQueryResult<CategoriesResult, unknown> {
  return useQuery('categories', async () => {
    return await request(apiUrl, query);
  });
}
