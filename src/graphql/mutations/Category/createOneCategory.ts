import { request, gql } from "graphql-request";
import { QueryClient, useMutation, useQueryClient } from "react-query";
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
export function useCreateOneCategory(apiUrl: string) {
  const client = useQueryClient();
  return useMutation('createOneCategory', async (variables: CategoryCreateVariables) => {
    return await request(apiUrl, mutation, variables);
  },
  {
    onSuccess: () => {
      // invalidates and refetches categories
      client.invalidateQueries('categories');
    }
  });
}
