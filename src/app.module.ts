import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { UserModule } from './user/user.module';

/**
 * 应用程序的根模块
 */
@Module({
    imports: [
        // 数据库
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'test',
            entities: [__dirname + '/**/*.entity{.ts,.js}'], // 静态全局路径
            autoLoadEntities: true, // 自动将通过 forFeature 注册的实体添加到配置对象的 entities 数组
            synchronize: true, // 实体与表同步，调试模式下开始，不然会有强替换导致数据丢失
        }),
        // 自定义配置
        ConfigModule.forRoot({
            load: [configuration],
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
