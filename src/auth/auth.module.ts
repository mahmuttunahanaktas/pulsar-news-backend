import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, JwtModule.register({
    secret: 'secretKey', // Bu şifreyi güçlü ve gizli bir şeyle değiştirin
    signOptions: { expiresIn: '1h' }, // Token'ın geçerlilik süresi
    global: true,
  })],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
