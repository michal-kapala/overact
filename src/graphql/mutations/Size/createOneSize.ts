import { request, gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { SizeCreateInput } from "../../../../prisma/generated/type-graphql";

/**
 * Input variables type for createOneSize mutation.
 */
export interface SizeCreateVariables {
  data: SizeCreateInput
}

const mutation = gql`
mutation createOneSize($data: SizeCreateInput!) {
    createOneSize(data: $data) {
        id
    }
}
`;

/**
 * Creates a new size.
 * @returns Wrapped `useMutation` results with new size id.
 */
export function useCreateOneSize(apiUrl: string) {
  const client = useQueryClient();
  return useMutation('createOneColor', async (variables: SizeCreateVariables) => {
    return await request(apiUrl, mutation, variables);
  },
  {
    onSuccess: () => {
      // invalidates and refetches sizes
      client.invalidateQueries('sizes');
    }
  });
}
