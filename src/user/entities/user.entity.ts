import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    // 主键自动增量
    @PrimaryGeneratedColumn()
    id: number;

    // 可以设置唯一值
    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    // 可以设置默认值
    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'timestamp' })
    createtime: Date;

    @Column({ type: 'timestamp' })
    updatetime: Date;
}
