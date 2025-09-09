import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserRole } from "../types/userRole";
import { Exclude, Expose, Transform } from "class-transformer";
import { toDateString } from "../utils/date";

@Entity("users")
@Exclude()
export class User {
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Expose()
  @Column()
  fullName!: string;

  @Expose()
  @Column({ type: Date })
  @Transform(({ value }) => (value ? toDateString(value) : null))
  birthDate!: Date;

  @Expose()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Expose()
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: "admin" | "user";

  @Expose()
  @Column({ default: true })
  isActive!: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
