import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { PostsService, PostsRo } from './posts.service';

@Controller('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    /**
     * 创建文章
     * @param post 文章
     */
    @Post()
    async create(@Body() post) {
        return await this.postsService.create(post);
    }

    /**
     * 获取所有文章
     */
    @Get()
    async findAll() {
        return this.postsService.findAll();
    }

    /**
     * 获取指定文章
     * @param id 文章id
     */
    @Get(':id')
    async findById(@Param('id') id) {
        return await this.postsService.findById(id);
    }

    /**
     * 更新文章
     * @param id 文章id
     * @param post 文章
     */
    @Put(':id')
    async update(@Param('id') id, @Body() post) {
        return await this.postsService.updateById(id, post);
    }

    /**
     * 删除
     * @param id 文章id
     */
    @Delete('id')
    async remove(@Param('id') id) {
        return await this.postsService.remove(id);
    }
}
