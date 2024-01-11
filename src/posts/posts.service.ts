import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import { PostsEntity } from './entities/posts.entity';

export interface PostsRo {
    list: PostsEntity[];
    count: number;
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRepository: Repository<PostsEntity>,
    ) {}

    /**
     * 创建文章
     * @param post 文章信息
     * @returns 返回创建后的文章
     */
    async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
        const { title } = post;

        if (!title) {
            throw new HttpException('缺少文章标题', 401);
        }

        const doc = await this.postsRepository.findOne({ where: { title } });

        if (doc) {
            throw new HttpException('文章已存在', 401);
        }

        return await this.postsRepository.save(post);
    }

    /**
     * 获取文章列表
     * @returns 返回文章列表和总数
     */
    async findAll() {
        const users = await this.postsRepository.find();
        return users;
    }

    /**
     * 获取指定文章
     * @param id 文章id
     * @returns 返回指定文章
     */
    async findById(id): Promise<PostsEntity> {
        return await this.postsRepository.findOne(id);
    }

    /**
     * 更新文章
     * @param id 文章id
     * @param post 文章信息
     * @returns 返回修改后的文章
     */
    async updateById(id, post): Promise<PostsEntity> {
        const existPost = await this.postsRepository.findOne(id);

        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }

        const updatePost = this.postsRepository.merge(existPost, post);
        return this.postsRepository.save(updatePost);
    }

    /**
     * 刪除文章
     * @param id 文章id
     * @returns 返回删除的文章
     */
    async remove(id) {
        const existPost = await this.postsRepository.findOne(id);

        if (!existPost) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }

        return await this.postsRepository.remove(existPost);
    }
}
