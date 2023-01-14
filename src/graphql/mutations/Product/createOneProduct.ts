import { request, gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { ProductCreateInput } from "../../../../prisma/generated/type-graphql";

/**
 * Input variables type for createOneProduct mutation.
 * Apollo Server expects the variables inside of 'data' root property.
 */
export interface ProductCreateVariables {
  data: ProductCreateInput
}

const mutation = gql`
mutation createOneProduct($data: ProductCreateInput!) {
    createOneProduct(data: $data) {
        id
    }
}
`;

/**
 * Creates a new product.
 * @returns Wrapped useMutation results with new product id.
 */
export function useCreateOneProduct(apiUrl: string) {
  const client = useQueryClient();
  return useMutation('createOneProduct', async (variables: ProductCreateVariables) => {
    return await request(apiUrl, mutation, variables);
  },
  {
    onSuccess: () => {
      // invalidates and refetches products
      client.invalidateQueries('products');
    }
  });
}
