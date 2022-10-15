import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../../src/graphql/user";

export const schema = await buildSchema({
    resolvers: [UserResolver]
});

const server = new ApolloServer({
    schema,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// https://github.com/apollographql/apollo-server/issues/5065
const start = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await start;
    await server.createHandler({ path: "/api/graphql" })(req, res);
}
