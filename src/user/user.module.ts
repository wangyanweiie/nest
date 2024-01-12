import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

/**
 * 3.我们将标记 UserService 与 user.service.ts 文件中的 UserService 类相关联（注册）
 */
@Module({
    /**
     * 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
     * 这样，我们就可以使用 @InjectRepository() 装饰器将 UserRepository 注入到 UserService
     */
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
