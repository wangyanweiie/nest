import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 提出问题
 * 1.为什么不使用 interface 而要使用 class 来声明 CreatePostDto？
 *  答：因为 Typescript 接口在编译过程中是被删除的，其次后面我们要给参数加说明,使用 Swagger 的装饰器，interface 也是无法实现的；
 * 2.为什么不直接用之前定义的实体类型 PostEntity，而是又定义一个 CreatePostDto？
 *  答：因为 HTTP 请求传参和返回的内容可以采用和数据库中保存的内容不同的格式，所以将它们分开可以随着时间的推移及业务变更带来更大的灵活性，这里涉及到单一设计的原则，因为每一个类应该处理一件事，最好只处理一件事；
 */
export class CreateUserDto {
    // ApiProperty 装饰必选参数
    @ApiProperty({ description: '用户名' })
    // 管道验证操作通常用在 dto 这种传输层的文件中，用作验证操作
    @IsNotEmpty({ message: '用户名不能为空' })
    user_name: string;

    @ApiProperty({ description: '密码' })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    // ApiPropertyOptional 装饰可选参数
    @ApiPropertyOptional({ description: '是否在线' })
    is_active?: boolean;

    @ApiPropertyOptional({ description: '创建时间' })
    create_time?: string;

    @ApiPropertyOptional({ description: '更新时间' })
    update_time?: string;
}
