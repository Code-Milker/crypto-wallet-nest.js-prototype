import { AuthService } from './auth.service';
import { CreateUserDto } from '@shared/libs';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
