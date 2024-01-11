import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 1.@Injectable() 装饰器声明 UserService 类是一个可以由 Nest IoC 容器管理的类
 */
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    /**
     * 创建记录
     * @param createUserDto 新增数据
     * @returns
     */
    async create(createUserDto: CreateUserDto) {
        // 生成新增时间与更新时间
        const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        createUserDto.create_time = datetime;
        createUserDto.update_time = datetime;

        const user = await this.userRepository.save(createUserDto);
        return this.userRepository.save(user);
    }

    /**
     * 返回全部记录
     * @returns
     */
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }

    /**
     * 返回指定一条记录
     * @param id 用户 ID
     * @returns
     */
    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({
            id: id,
        });

        if (!user) {
            throw new Error(`未找到该用户数据`);
        }

        return user;
    }

    /**
     * 更新指定一条记录
     * @param id 用户 ID
     * @param updateUserDto 更新数据
     * @returns
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
        const datetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        updateUserDto.update_time = datetime;

        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto,
        });

        if (!user) {
            throw new Error(`未找到该用户数据`);
        }

        return this.userRepository.save(user);
    }

    /**
     * 删除指定一条记录
     * @param id 用户 ID
     * @returns
     */
    async remove(id) {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new Error(`未找到该用户数据`);
        }

        return this.userRepository.remove(user);
    }
}
