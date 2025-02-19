import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client'; // Role enum’umuzu import edelim

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
