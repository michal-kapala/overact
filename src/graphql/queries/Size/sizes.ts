import "reflect-metadata";
import { request, gql } from "graphql-request";
import { useQuery, UseQueryResult } from "react-query";
import type { Size } from "../../../../prisma/generated/type-graphql";

/**
 * Response type for 'sizes' query.
 */
interface SizesResult {
  sizes: Size[]
}

const query = gql`
query sizes {
    sizes {
        id
        name
        size
        categoryId
    }
}
`;

/**
 * Fetches all sizes without nested category data.
 * @returns Wrapped useQuery results with size list
 */
export function useSizes(): UseQueryResult<SizesResult, unknown> {
  return useQuery('sizes', async () => {
    return await request('http://localhost:3000/api/graphql', query);
  });
}
