import { Controller, Get, UseGuards, Body, Delete, Param, Post } from "@nestjs/common";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/auth/role.guard";
import { Roles } from "src/auth/roles.decorator";
import { AdminService } from "./admin.service";
@Roles(Role.ADMIN)
@UseGuards(RoleGuard)
@Controller('adminpanel')
export class AdminController {
    constructor(private adminService: AdminService) { }
    //adminpanel endpointi
    @Get()
    getAdminPanel() {
        return 'Admin Paneli';
    }
    //tüm adminleri listeleten fonksiyonu service'den çekelim
    @Get('admins')
    getAdmins() {
        return this.adminService.allAdmins();
    }
    //admin silme
    @Delete(':email')
    async deleteUser(@Param('email') email: string) {
        return this.adminService.deleteUser(email);
    }
    //tüm adminleri listeleten fonksiyonu service'den çekelim
    @Post('createAdmin')
    async createAdmin(@Body() body: { name: string, password: string, email: string }) {
        return this.adminService.createAdmin(body.name, body.password, body.email);
    }
}
