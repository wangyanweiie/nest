import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('文章')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiOperation({ summary: '创建文章' })
    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
        return await this.postService.create(createPostDto);
    }

    @ApiOperation({ summary: '获取所有文章' })
    @Get()
    async findAll() {
        return this.postService.findAll();
    }

    @ApiOperation({ summary: '获取指定文章' })
    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.postService.findById(id);
    }

    @ApiOperation({ summary: '更新指定文章' })
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        return await this.postService.updateById(id, updatePostDto);
    }

    @ApiOperation({ summary: '删除指定文章' })
    @Delete('id')
    async remove(@Param('id') id: number) {
        return await this.postService.remove(id);
    }
}
