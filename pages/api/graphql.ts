import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../../src/graphql/permissions";
import { createContext } from "../../src/graphql/context";
// resolvers
import { 
    FindManyUserResolver,
    FindManyProductResolver,
    CreateOneProductResolver,
} from "../../prisma/generated/type-graphql";

export const schema = await buildSchema({
    resolvers: [
        FindManyUserResolver,
        FindManyProductResolver,
        CreateOneProductResolver,
    ]
});

const server = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    context: createContext,
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
