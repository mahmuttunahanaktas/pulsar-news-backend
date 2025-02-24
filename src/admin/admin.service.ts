import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';


@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    //tüm adminleri listeleme fonksiyonumuz.
    async allAdmins() {
        return this.prisma.user.findMany({ where: { role: 'ADMIN' } });
    }

    //admini bulma fonskiyonumuz.
    async findUser(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async deleteUser(email: string) {
        const deletedUser = await this.findUser(email);
        if (!deletedUser) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }
        //kullanıcıyı silelim.
        await this.prisma.user.delete({ where: { email } });
        return { message: "Admin Başarıyla Silindi!" };
    }



    async createAdmin(name: string, password: string, email: string) {
        //önce şifreyi alıp hashleyelim sonrada haslenmiş şifreyle
        //birlikte diğer verileri de user tablomuza şutlayalım.
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role:'ADMIN',
            }
        })

    }










}
