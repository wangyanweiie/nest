import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 1.@Injectable() 装饰器声明 UserService 类是一个可以由 Nest IoC 容器管理的类
 */
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    /**
     * 创建记录
     * @param createUserDto
     * @returns
     */
    async create(createUserDto: CreateUserDto) {
        // 生成新增时间与更新时间
        const createtime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const updatetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        createUserDto.createtime = createtime;
        createUserDto.updatetime = updatetime;

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
     * @returns
     */
    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({
            id: id,
        });

        return user;
    }

    /**
     * 更新指定一条记录
     * @returns
     */
    async update(id: number, updateUserDto: UpdateUserDto) {
        const updatetime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        updateUserDto.updatetime = updatetime;

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
     * @returns
     */
    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new Error(`未找到该用户数据`);
        }

        return this.userRepository.remove(user);
    }
}
