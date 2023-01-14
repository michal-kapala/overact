import { request, gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { ColorCreateInput } from "../../../../prisma/generated/type-graphql";

/**
 * Input variables type for createOneColor mutation.
 */
export interface ColorCreateVariables {
  data: ColorCreateInput
}

const mutation = gql`
mutation createOneColor($data: ColorCreateInput!) {
    createOneColor(data: $data) {
        id
    }
}
`;

/**
 * Creates a new color.
 * @returns Wrapped `useMutation` results with new color id.
 */
export function useCreateOneColor(apiUrl: string) {
  const client = useQueryClient();
  return useMutation('createOneColor', async (variables: ColorCreateVariables) => {
    return await request(apiUrl, mutation, variables);
  },
  {
    onSuccess: () => {
      // invalidates and refetches colors
      client.invalidateQueries('colors');
    }
  });
}
