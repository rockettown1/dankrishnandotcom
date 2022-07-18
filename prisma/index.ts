import { PrismaClient } from "@prisma/client";

/* 
This is to handle Nextjs hot reloading in development which instantiates new prisma instances 
Source: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
*/

// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

export const prisma = new PrismaClient();
