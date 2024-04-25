import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateRequestDto } from '../dto/user-create-request.dto/user-create-request.dto';
import { UserUpdateRequestDto } from '../dto/user-update-request.dto/user-update-request.dto';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, 
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {};

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
        const cachedName = await this.cacheManager.get<UserEntity>(uuid);

        if(cachedName){
            console.log("cached")
            return cachedName;
        }

        const user = await this.userRepository.findOne({where: {uuid: uuid}});
        await this.cacheManager.set(user.uuid, user);
        return user;
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

    async sigIn(email: string, password: string): Promise<{accessToken: string}>{
        const user = await this.userRepository.findOne({where: {email: email}});
        if(user.password !== password){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.uuid, email: user.email };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

}
