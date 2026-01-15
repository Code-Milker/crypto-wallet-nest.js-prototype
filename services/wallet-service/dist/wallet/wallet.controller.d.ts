import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    create(userId: number): Promise<{
        id: number;
        publicAddress: string;
    }>;
    findAll(userId: number): Promise<import("@shared/libs").Wallet[]>;
}
