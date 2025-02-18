import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Dışa aktarıyoruz ki diğer modüller kullanabilsin
})
export class PrismaModule {}
