import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    // 主键自动增量
    @PrimaryGeneratedColumn()
    id: number;

    // 可以设置唯一值
    @Column({ unique: true })
    user_name: string;

    @Column()
    password: string;

    // 可以设置默认值
    @Column({ default: true })
    is_active: boolean;

    @Column({ type: 'timestamp' })
    create_time: Date;

    @Column({ type: 'timestamp' })
    update_time: Date;
}
