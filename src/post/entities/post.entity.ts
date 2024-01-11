import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
    // 主键自动增量
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    author: string;

    @Column({ length: 50 })
    title: string;

    @Column('text')
    content: string;

    @Column('tinyint')
    type: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_time: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_time: Date;
}
