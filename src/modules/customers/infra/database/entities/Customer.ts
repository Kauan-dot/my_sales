import { ICustomer } from "modules/customers/domain/models/ICustumer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('customers')
export class Customer implements ICustomer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}