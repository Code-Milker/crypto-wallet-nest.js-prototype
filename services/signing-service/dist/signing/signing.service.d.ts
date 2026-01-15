import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SignMessageDto, Signature } from '@shared/libs';
export declare class SigningService {
    private signaturesRepository;
    private httpService;
    private configService;
    constructor(signaturesRepository: Repository<Signature>, httpService: HttpService, configService: ConfigService);
    sign(walletId: number, dto: SignMessageDto): Promise<string>;
}
