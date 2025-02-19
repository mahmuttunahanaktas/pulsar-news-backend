import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}


    //Kayıt ol endpointi
    @Post('register')
    async register(@Body() body:{name:string,password:string,email:string}){
        return this.authService.register(body.name,body.password,body.email);
    }

    //giriş endpointi
    @Post('login')
    async login(@Body() body:{password:string,email:string}){
        return this.authService.login(body.password,body.email);
    }


}
