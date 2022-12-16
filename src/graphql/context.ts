import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import client from "../../prisma/prisma";

/**
 * Context wrapper for Apollo Server resolvers.
 */
export interface Context {
  prisma: PrismaClient
  res: ServerResponse
  req: MicroRequest
}

/**
 * Wraps Apollo Server context with Prisma Client.
 * @param ctx Original Apollo Server context.
 * @returns A new Apollo Server context.
 */
export function createContext({ res, req }: {res: ServerResponse, req: MicroRequest}): Context {
  return { prisma: client, res, req }
}
