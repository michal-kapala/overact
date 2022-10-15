import "reflect-metadata";
import { Resolver, ObjectType, Query, Mutation, Field, ID } from "type-graphql";
import prisma from "../../prisma/prisma";

// GraphQL definition
@ObjectType({description: "NextAuth.js user model"})
export class User {
    @Field(() => ID)
    id!: string;
    @Field({description: "User's name"})
    name!: string;
    @Field(({description: "User's unique email"}))
    email!: string;
    @Field({description: "Email verification date", nullable: true})
    emailVerified?: Date;
    @Field({description: "User's image URI", nullable: true})
    image?: string;
}

// GraphQL resolver
@Resolver(User)
export class UserResolver {
    // All users
    @Query(() => [User])
    async users(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }
}
