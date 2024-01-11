import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';

/**
 * 应用程序入口文件
 * 它使用核心函数 NestFactory 用来创建 Nest 应用程序的实例
 */
async function bootstrap() {
    /**
     * 要创建 Nest 应用程序实例，我们使用核心 NestFactory 类
     * NestFactory 公开了一些允许创建应用程序实例的静态方法
     * 该方法返回一个实现接口 create() 的应用程序对象
     */
    const app = await NestFactory.create(AppModule);

    // 设置全局路由前缀
    app.setGlobalPrefix('api');

    // 注册管道校验器
    app.useGlobalPipes(new ValidationPipe());

    // 注册错误的过滤器
    app.useGlobalInterceptors(new TransformInterceptor());

    // 注册拦截器
    app.useGlobalFilters(new HttpExceptionFilter());

    // 设置 swagger 文档
    const config = new DocumentBuilder()
        .setTitle('Nest')
        .setDescription('Nest 后台接口文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // 启动 HTTP 侦听器，它让应用程序等待入站 HTTP 请求
    await app.listen(3000);
}

bootstrap();
