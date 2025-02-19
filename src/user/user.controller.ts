import { Controller, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { resolveSoa } from 'dns';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getUsers() {
        return this.userService.allUsers();
    }

    @Delete(':email')
    async deleteUser(@Param('email') email: string) {
        return this.userService.deleteUser(email);
    }





}
