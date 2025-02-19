import { Controller, Get, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { RoleGuard } from "src/auth/role.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller('adminpanel')
export class AdminController {

    //adminpanel endpointi
    @Get()
    @Roles(Role.ADMIN) 
    @UseGuards(RoleGuard) 
    getAdminPanel() {
        return 'Admin Paneli';
    }

}
