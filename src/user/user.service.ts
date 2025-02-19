import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    //Kullanıcı Oluşturma fonskiyonu
    async createUser(name:string,password:string,email:string,role:Role){
        //önce şifreyi alıp hashleyelim sonrada haslenmiş şifreyle
        //birlikte diğer verileri de user tablomuza şutlayalım.
        const hashedPassword=await bcrypt.hash(password,10);
        return this.prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role,
            }
        })

    }

    //Kullanıcı bulma fonskiyonumuz.
    async findUser(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    //Kullanıcı bulma fonskiyonumuz.
    async allUsers() {
        return this.prisma.user.findMany();
    }

    async deleteUser(email: string) {
        const deletedUser = await this.findUser(email);
        if (!deletedUser) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }

        //kullanıcıyı silelim.
        await this.prisma.user.delete({ where: { email } });
        return { message: "Kullanıcı Başarıyla Silindi!" };


    }


}
