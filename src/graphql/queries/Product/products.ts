import "reflect-metadata";
import { request, gql } from "graphql-request";
import { useQuery, UseQueryResult } from "react-query";
import type { Product } from "../../../../prisma/generated/type-graphql";

/**
 * Response type for 'products' query.
 */
export interface ProductsResult {
  products: Product[]
}

/**
 * GraphQL `products` query.
 */
const query = gql`
query products {
    products {
        id
        skuId
        name
        price
        image
        category {
          id
          name
          tags
        }
        colors {
          id
          name
          rgb
        }
        sizes {
          id
          name
          size
        }
    }
}
`;

/**
 * Fetches all products.
 * @returns `ProductsResult`
 */
export async function queryProducts() {
  return await request('http://localhost:3000/api/graphql', query);
}

/**
 * Wrapper for `useQuery` of `products`.
 * @returns Wrapped useQuery results with product list
 */
export function useProducts(): UseQueryResult<ProductsResult, unknown> {
  return useQuery('products', queryProducts);
}
