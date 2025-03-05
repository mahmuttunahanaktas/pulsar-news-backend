import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RequestLoggerMiddleware } from 'src/common/middleware/request-logger.middleware';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [UserService, {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  }],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.POST }
      );
  }
}
