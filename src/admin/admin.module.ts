import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers:[AdminController],
  imports:[JwtModule],
  providers: [AdminService,PrismaService],
})
export class AdminModule {}
