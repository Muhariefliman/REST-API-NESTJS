import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_blog")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
