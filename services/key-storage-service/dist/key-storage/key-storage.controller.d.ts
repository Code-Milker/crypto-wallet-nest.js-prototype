import { KeyStorageService } from './key-storage.service';
export declare class KeyStorageController {
    private keyStorageService;
    constructor(keyStorageService: KeyStorageService);
    store(walletId: number, encryptedPrivateKey: string): Promise<{
        success: boolean;
    }>;
    get(walletId: number): Promise<{
        encryptedPrivateKey: string | undefined;
    }>;
}
