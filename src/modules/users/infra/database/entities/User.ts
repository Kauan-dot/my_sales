import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()  
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar" })
  @Exclude()
  password: string;

  @Column({ type: "varchar" })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;  

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' }) 
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

}