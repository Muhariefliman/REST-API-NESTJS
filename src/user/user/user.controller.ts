import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserCreateRequestDto } from '../dto/user-create-request.dto/user-create-request.dto';
import { UserService } from './user.service';
import { UserEntity } from '../entity/user.entity/user.entity';
import { UserUpdateRequestDto } from '../dto/user-update-request.dto/user-update-request.dto';

@Controller('user')
export class UserController {

    constructor(private userServices: UserService){}
    
    @Post()
    public postUser(@Body() user: UserCreateRequestDto): Promise<void> {
        this.userServices.createUser(user);
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    @Get()
    public getUser(@Body('uuid') uuid: string): Promise<UserEntity> {
        return this.userServices.findOne(uuid);
    }

    @Get('/all')
    public getUserAll(): Promise<UserEntity[]> {
        return this.userServices.findAll();
    }

    @Delete()
    public deleteUser(@Body('uuid') uuid:string): Promise<void> {
        this.userServices.delete(uuid);
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    @Put()
    public updateUser(@Body() user: UserUpdateRequestDto): Promise<void> {
        this.userServices.update(user);
        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }


}
