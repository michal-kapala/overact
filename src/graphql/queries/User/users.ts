import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const query = gql`
query users {
    users {
        id
        name
    }
}
`;

/**
 * Fetches all users.
 * @returns useQuery results with user list
 */
export function useUsers(apiUrl: string) {
  return useQuery('users', async () => {
    return await request(apiUrl, query);
  });
}
