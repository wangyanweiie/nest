import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    user_name: string;

    @IsNotEmpty({ message: '密码不能为空' })
    password: string;

    is_active: boolean;

    create_time?: string;

    update_time?: string;
}
