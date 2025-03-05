import { Controller, Get, Delete, Param, Patch, Body , UseInterceptors} from '@nestjs/common';
import { UserService } from './user.service';

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

    @Get('findUsers/:email')
    async findUser(@Param('email') email: string) {
        return this.userService.findUser(email);
    }

    @Patch('/update')
    async updateUser(
        @Body('email') email: string,
        @Body('newemail') newemail: string,
        @Body('newname') newname: string,
    ) {
        return this.userService.updateUser(email, newemail, newname);

    }
}
