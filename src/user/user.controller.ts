import { Body, Controller, Put, Get, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UseInterceptors, UseGuards, Res, Req } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { UserResponse } from './responses';
import { CurrentUser, Roles } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import { RolesGuard } from '@auth/guards/role.guard';
import { Role, User } from '@prisma/client';




@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get('me')
    me(@CurrentUser() user: JwtPayload) {
        return user;
    }

    @Get()
    async findAllUsers() {
        const users = await this.userService.findAll()
        return users
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':idOrEmail')
    async findOneUser(@Param('idOrEmail') idOrEmail: string) {
        const user = await this.userService.findOne(idOrEmail)
        return new UserResponse(user)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: JwtPayload) {
        return this.userService.delete(id, user)
    }

  
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Put()
    async updateUser(@Body() body: Partial<User>) {
        const user = await this.userService.save(body);
        return new UserResponse(user);
    }
}
