import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

/**
 * 应用程序的根模块
 * @Module 装饰器
 * 装饰器接收四个属性：imports、exports、controllers、providers：
 *   - imports：导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入；
 *   - exports：导出服务的列表，供其他模块导入使用；
 *   - controllers：处理 http 请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给 providers 处理；
 *   - providers：Nest.js 注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享
 */
@Module({
    imports: [
        // 数据库
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'root',
        //     password: '123456',
        //     database: 'test',
        //     entities: [__dirname + '/**/*.entity{.ts,.js}'], // 静态全局路径
        //     autoLoadEntities: true, // 自动将通过 forFeature 注册的实体添加到配置对象的 entities 数组
        //     synchronize: true, // 实体与表同步，调试模式下开始，不然会有强替换导致数据丢失
        // }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST', 'localhost'),
                port: configService.get('DB_PORT', 3306),
                username: configService.get('DB_USERNAME', 'root'),
                password: configService.get('DB_PASSWORD', '123456'),
                database: configService.get('DB_DATABASE', 'test'),
                // entities: [__dirname + '/**/*.entity{.ts,.js}'],
                autoLoadEntities: true, // 自动将通过 forFeature 注册的实体添加到配置对象的 entities 数组
                synchronize: true, // 实体与表同步，调试模式下开始，不然会有强替换导致数据丢失
            }),
        }),

        // 自定义配置
        ConfigModule.forRoot({
            load: [envConfig],
        }),

        UserModule,
        PostsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
