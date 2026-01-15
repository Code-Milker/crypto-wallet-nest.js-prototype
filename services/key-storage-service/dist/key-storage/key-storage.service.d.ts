import { Repository } from 'typeorm';
import { Wallet } from '@shared/libs';
export declare class KeyStorageService {
    private walletsRepository;
    constructor(walletsRepository: Repository<Wallet>);
    storeEncryptedKey(walletId: number, encryptedPrivateKey: string): Promise<void>;
    getEncryptedKey(walletId: number): Promise<string | undefined>;
}
