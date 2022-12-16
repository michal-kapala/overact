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
export function useUsers() {
  return useQuery('users', async () => {
    return await request('http://localhost:3000/api/graphql', query);
  });
}
