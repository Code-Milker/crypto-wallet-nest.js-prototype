import { SigningService } from './signing.service';
import { SignMessageDto } from '@shared/libs';
export declare class SigningController {
    private signingService;
    constructor(signingService: SigningService);
    sign(walletId: number, dto: SignMessageDto): Promise<string>;
}
