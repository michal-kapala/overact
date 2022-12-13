import { request, gql } from "graphql-request";
import { useMutation } from "react-query";
import { ProductCreateInput } from "../../../../prisma/generated/type-graphql";

export const createOneProduct = gql`
mutation createOneProduct($data: ProductCreateInput!) {
    createOneProduct(data: $data) {
        id
    }
}
`;

export function useCreateOneProduct() {
    return useMutation('createOneProduct', async (variables: ProductCreateInput) => {
        return await request('http://localhost:3000/api/graphql', createOneProduct, variables);
    });
}
