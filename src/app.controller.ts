import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 控制层
 * 带有单个路由的基本控制器示例
 */

/**
 * 装饰器
 * 1.装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上；
 * 2.装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入；
 * 3.多个装饰器可以同时应用到一个声明上，当多个装饰器应用于一个声明上，它们求值方式与复合函数相似；
 *  - 由上至下依次对装饰器表达式求值
 *  - 求值的结果会被当作函数，由下至上依次调用
 */

// 类装饰器
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // 方法装饰器：声明接口的请求类型
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
