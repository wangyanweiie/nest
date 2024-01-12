import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    /**
     * 创建文章
     * @param post 文章信息
     * @returns 返回创建后的文章
     */
    async create(createPostDto: CreatePostDto) {
        const { title } = createPostDto;

        if (!title) {
            throw new HttpException('缺少文章标题', 401);
        }

        const doc = await this.postRepository.findOne({ where: { title } });

        if (doc) {
            throw new HttpException('文章已存在', 401);
        }

        const post = await this.postRepository.save(createPostDto);
        return this.postRepository.save(post);
    }

    /**
     * 获取文章列表
     * @returns 返回文章列表和总数
     */
    async findAll() {
        const posts = await this.postRepository.find();
        return posts;
    }

    /**
     * 获取指定文章
     * @param id 文章id
     * @returns 返回指定文章
     */
    async findById(id) {
        return await this.postRepository.findOne(id);
    }

    /**
     * 更新文章
     * @param id 文章id
     * @param post 文章信息
     * @returns 返回修改后的文章
     */
    async updateById(id, updatePostDto: UpdatePostDto) {
        const post = await this.postRepository.findOne(id);

        if (!post) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }

        const updatePost = this.postRepository.merge(post, updatePostDto);
        return this.postRepository.save(updatePost);
    }

    /**
     * 刪除文章
     * @param id 文章id
     * @returns 返回删除的文章
     */
    async remove(id) {
        const post = await this.postRepository.findOne(id);

        if (!post) {
            throw new HttpException(`id为${id}的文章不存在`, 401);
        }

        return await this.postRepository.remove(post);
    }
}
