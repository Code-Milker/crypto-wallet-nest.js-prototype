import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("wallets")
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  publicAddress: string;

  @Column()
  encryptedPrivateKey: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }) // Change to 'datetime'
  createdAt: Date;
}
