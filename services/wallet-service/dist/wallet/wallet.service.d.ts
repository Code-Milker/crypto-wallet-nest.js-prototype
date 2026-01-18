import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Wallet } from '@shared/libs';
export declare class WalletService {
    private walletsRepository;
    private httpService;
    private configService;
    private readonly logger;
    constructor(walletsRepository: Repository<Wallet>, httpService: HttpService, configService: ConfigService);
    create(userId: number): Promise<{
        id: number;
        publicAddress: string;
    }>;
    findAll(userId: number): Promise<Wallet[]>;
}
