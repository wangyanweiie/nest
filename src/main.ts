import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * 应用程序入口文件
 * 它使用 NestFactory 用来创建 Nest 应用实例
 */
async function bootstrap() {
    /**
     * 要创建 Nest 应用程序实例，我们使用核心 NestFactory 类
     * NestFactory 公开了一些允许创建应用程序实例的静态方法
     * 该方法返回一个实现接口 create() 的应用程序对象
     */
    const app = await NestFactory.create(AppModule);

    // 启动 HTTP 侦听器，它让应用程序等待入站 HTTP 请求
    await app.listen(3000);

    // 校验器
    app.useGlobalPipes(new ValidationPipe());
}

bootstrap();
