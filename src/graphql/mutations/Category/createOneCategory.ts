import { request, gql } from "graphql-request";
import { useMutation } from "react-query";
import { CategoryCreateInput } from "../../../../prisma/generated/type-graphql";

/**
 * Input variables type for createOneCategory mutation.
 */
export interface CategoryCreateVariables {
    data: CategoryCreateInput
}

const mutation = gql`
mutation createOneCategory($data: CategoryCreateInput!) {
    createOneCategory(data: $data) {
        id
    }
}
`;

/**
 * Creates a new category.
 * @returns Wrapped useMutation results with new category id.
 */
export function useCreateOneCategory() {
    return useMutation('createOneCategory', async (variables: CategoryCreateVariables) => {
        return await request('http://localhost:3000/api/graphql', mutation, variables);
    });
}
