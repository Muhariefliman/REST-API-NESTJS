import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateRequestDto } from '../dto/user-create-request.dto/user-create-request.dto';
import { UserUpdateRequestDto } from '../dto/user-update-request.dto/user-update-request.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {};

    async createUser(user: UserCreateRequestDto): Promise<void>{
        let newUser = new UserEntity();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser = await this.userRepository.save(newUser);
    }

    async findAll(): Promise<UserEntity[]>{
        return await this.userRepository.find();
    }

    async findOne(uuid: string): Promise<UserEntity>{
        return await this.userRepository.findOne({where: {uuid: uuid}});
    }

    async update(user: UserUpdateRequestDto): Promise<void>{
        let userEntity = await this.userRepository.findOne({where: {uuid: user.uuid}});
        userEntity.name = user.name==null?userEntity.name:user.name;
        userEntity.email = user.email==null?userEntity.email:user.email;
        userEntity.password = user.password==null?userEntity.password:user.password;
        userEntity = await this.userRepository.save(userEntity);
    }

    async delete(uuid: string): Promise<void>{
        const user = await this.userRepository.findOne({where: {uuid: uuid}});
        await this.userRepository.remove(user);
    }


}
