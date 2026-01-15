import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginDto, SignMessageDto } from '@shared/libs';
export declare class ApiGatewayService {
    private httpService;
    private configService;
    constructor(httpService: HttpService, configService: ConfigService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    createWallet(userId: number): Promise<any>;
    listWallets(userId: number): Promise<any>;
    signMessage(walletId: number, dto: SignMessageDto): Promise<any>;
}
