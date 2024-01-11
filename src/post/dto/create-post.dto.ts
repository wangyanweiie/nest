import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
    // ApiProperty 装饰必选参数
    @ApiProperty({ description: '文章作者' })
    // 必填校验
    @IsNotEmpty({ message: '文章作者不能为空' })
    author: string;

    @ApiProperty({ description: '文章标题' })
    @IsNotEmpty({ message: '文章标题不能为空' })
    title: string;

    @ApiProperty({ description: '文章内容' })
    @IsNotEmpty({ message: '文章内容不能为空' })
    content: string;

    // ApiPropertyOptional 装饰可选参数
    @ApiPropertyOptional({ description: '类型' })
    @IsNumber()
    type?: number;

    @ApiPropertyOptional({ description: '创建时间' })
    @IsString()
    create_time?: string;

    @ApiPropertyOptional({ description: '更新时间' })
    @IsString()
    update_time?: string;
}
