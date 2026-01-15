import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./wallet.entity";

@Entity("signatures")
export class Signature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.id)
  wallet: Wallet;

  @Column()
  messageHash: string;

  @Column()
  signature: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
