import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * 3.我们将标记 UserService 与 user.service.ts 文件中的 UserService 类相关联（注册）
 */
@Module({
    /**
     * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
     * 这样，我们就可以使用 @InjectRepository() 装饰器将 UsersRepository 注入到 UsersService
     */
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
