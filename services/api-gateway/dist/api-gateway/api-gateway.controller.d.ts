import { ApiGatewayService } from './api-gateway.service';
import { CreateUserDto, LoginDto, SignMessageDto } from '@shared/libs';
export declare class ApiGatewayController {
    private apiGatewayService;
    constructor(apiGatewayService: ApiGatewayService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    createWallet(req: any): Promise<any>;
    listWallets(req: any): Promise<any>;
    signMessage(req: any, walletId: number, dto: SignMessageDto): Promise<any>;
}
