import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 2.UserController 声明了一个依赖于 userService 令牌(token)的构造函数注入
 * 我们使用 @Controller() 装饰器定义一个基本的控制器，可选 路由路径前缀设置为 user
 * 在 @Controller() 装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组，并最大程度地减少重复代码
 */
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 给接口追加子路由
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('find/all')
    findAll() {
        return this.userService.findAll();
    }

    @Get('find/one')
    findOne(@Query('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
