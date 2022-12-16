import { request, gql } from "graphql-request";
import { useMutation } from "react-query";
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
export function useCreateOneProduct() {
  return useMutation('createOneProduct', async (variables: ProductCreateVariables) => {
    return await request('http://localhost:3000/api/graphql', mutation, variables);
  });
}
