import { Role } from "@prisma/client";

export interface JwtPayload {
    name: string;
    email:string;
    role:Role;
  }
  