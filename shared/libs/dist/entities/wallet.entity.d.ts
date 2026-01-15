import { User } from "./user.entity";
export declare class Wallet {
    id: number;
    user: User;
    publicAddress: string;
    encryptedPrivateKey: string | null;
    createdAt: Date;
}
