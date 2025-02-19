import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
//validation için bcrypt'yi import edelim
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Role } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private jwtService:JwtService,
    ) { }

    // Kullanıcıyı doğrulama fonksiyonumuz.
    async validateUser(password: string, email: string) {
        //userService içerisindeki finduser fonksiyonunu kullanarak 
        //böyle bir kullanıcı var mı yok mu kontrol edelim
        const user=await this.userService.findUser(email);
        if(user&&(await bcrypt.compare(password,user.password))){
            //eğer user verisi boş değilse ve password'lar eşleşiyorsa
            //bulduğumuz kullanıcıyı döndürüyoruz.
            return user;
        }
        return null;

    }

    //Kullanıcı giriş fonksiyonu
    async login( password: string, email: string) {
        //öncelikle böyle bir kullanıcı var mı yok mu bunu
        // sayfadaki validation ile kontrol edelim
        const user = await this.validateUser( password, email);
        if (!user) {
            throw new Error('Invalid credentials');

        }
        const payload: JwtPayload = { 
            name: user.name, 
            role: user.role as Role // Eğer Prisma'dan string dönüyorsa TypeScript'e Role olduğunu belirt
          };
                  const token=this.jwtService.sign(payload);
        return { access_token: token };  // Token'ı geri döndürüyoruz


    }

    //Kullanıcı kayıt olma fonksiyonu
    async register(name: string, password: string, email: string) {
        return this.userService.createUser(name, password, email, Role.USER);
      }

}
