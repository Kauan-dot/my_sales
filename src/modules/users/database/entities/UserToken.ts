import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_tokens")
export class UserToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("uuid")
    @Generated("uuid")
    token: string;

    @Column("uuid")
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}