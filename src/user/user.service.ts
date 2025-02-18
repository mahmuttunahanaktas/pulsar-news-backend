import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    //Kullanıcı Oluşturma fonskiyonu
    async createUser(name:string,password:string,email:string){
        //önce şifreyi alıp hashleyelim sonrada haslenmiş şifreyle
        //birlikte diğer verileri de user tablomuza şutlayalım.
        const hashedPassword=await bcrypt.hash(password,10);
        return this.prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
            }
        })

    }

    //Kullanıcı bulma fonskiyonumuz.
    async findUser(email:string){
        return this.prisma.user.findUnique({where :{email}});
    }

     //Kullanıcı bulma fonskiyonumuz.
     async allUsers(){
        return this.prisma.user.findMany();
    }


}
