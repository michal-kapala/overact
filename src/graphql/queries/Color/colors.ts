import "reflect-metadata";
import { request, gql } from "graphql-request";
import { useQuery, UseQueryResult } from "react-query";
import type { Color } from "../../../../prisma/generated/type-graphql";

/**
 * Response type for 'colors' query.
 */
interface ColorsResult {
  colors: Color[]
}

const query = gql`
query colors {
    colors {
        id
        name
        rgb
    }
}
`;

/**
 * Fetches all colors.
 * @returns Wrapped useQuery results with color list
 */
export function useColors(apiUrl: string): UseQueryResult<ColorsResult, unknown> {
  return useQuery('colors', async () => {
    return await request(apiUrl, query);
  });
}
