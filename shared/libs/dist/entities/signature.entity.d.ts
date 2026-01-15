import { Wallet } from './wallet.entity';
export declare class Signature {
    id: number;
    wallet: Wallet;
    messageHash: string;
    signature: string;
    createdAt: Date;
}
