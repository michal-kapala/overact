import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import client from "../../prisma/prisma";

export interface Context {
  prisma: PrismaClient
  res: ServerResponse
  req: MicroRequest
}

export function createContext({ res, req }: {res: ServerResponse, req: MicroRequest}): Context {
  return { prisma: client, res, req }
}
