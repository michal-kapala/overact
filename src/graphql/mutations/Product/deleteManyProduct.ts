import { request, gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { ProductWhereInput } from "../../../../prisma/generated/type-graphql";

/**
 * Input variables type for deleteManyProduct mutation.
 * Apollo Server expects the variables inside of 'data' root property.
 */
export interface ProductDeleteManyVariables {
  data: ProductWhereInput
}

const mutation = gql`
mutation deleteManyProduct($data: ProductWhereInput!) {
    deleteManyProduct(where: $data) {
        count
    }
}
`;

/**
 * Deletes products.
 * @returns Wrapped `useMutation` results.
 */
export function useDeleteManyProduct(apiUrl: string) {
  const client = useQueryClient();
  return useMutation('deleteManyProduct', async (variables: ProductDeleteManyVariables) => {
    return await request(apiUrl, mutation, variables);
  },
  {
    onSuccess: () => {
      // invalidates and refetches products
      client.invalidateQueries('products');
    }
  });
}
