import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client'; // Enum rolümüzü import edelim
import { JwtPayload } from 'src/auth/jwt-payload.interface'; // JwtPayload tipini import edelim

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    // Hedef endpoint’in rol bilgisini alıyoruz
    if (!requiredRoles) {
      return true; // Eğer rol bilgisi yoksa, tüm kullanıcılar erişebilir
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Bearer token'ı alıyoruz

    if (!token) {
      throw new ForbiddenException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token); // JWT token'ı doğruluyoruz
      const { role } = decoded; // JWT'den kullanıcı rolünü alıyoruz
  

      if (!requiredRoles.includes(role)) {
        throw new ForbiddenException('You do not have permission to access this resource');
      }

      return true; // Kullanıcı rolü uygun ise erişim izni veriyoruz
    } catch (error) {
      console.log('Token doğrulama hatası:', error);
      console.log('Required roles:', requiredRoles);
      throw new ForbiddenException('Invalid or expired token');
    }
    
  }
}
