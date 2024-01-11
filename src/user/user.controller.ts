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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * 2.UserController 声明了一个依赖于 userService 令牌(token)的构造函数注入
 * 我们使用 @Controller() 装饰器定义一个基本的控制器，可选 路由路径前缀设置为 user
 * 在 @Controller() 装饰器中使用路径前缀可以使我们轻松地对一组相关的路由进行分组，并最大程度地减少重复代码
 */
@ApiTags('用户')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: '创建用户' })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: '获取所有用户' })
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: '获取指定用户' })
    @Get(':id')
    findOne(@Query('id') id: number) {
        return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: '更新指定用户' })
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: '删除指定用户' })
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(+id);
    }
}
