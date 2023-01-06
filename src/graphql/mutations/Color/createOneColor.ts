import { request, gql } from "graphql-request";
import { useMutation } from "react-query";
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
export function useCreateOneColor() {
  return useMutation('createOneColor', async (variables: ColorCreateVariables) => {
    return await request('http://localhost:3000/api/graphql', mutation, variables);
  });
}
