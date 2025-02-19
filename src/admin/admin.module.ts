import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers:[AdminController],
  imports:[JwtModule],
  providers: [AdminService]
})
export class AdminModule {}
