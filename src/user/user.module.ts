import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  imports:[PrismaModule,UserModule],
  providers: [UserService],
  controllers:[UserController],
  exports:[UserService]
})
export class UserModule {}
