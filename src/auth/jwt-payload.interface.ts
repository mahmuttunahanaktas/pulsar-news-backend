import { Role } from "@prisma/client";

export interface JwtPayload {
    name: string;
    role:Role;
  }
  