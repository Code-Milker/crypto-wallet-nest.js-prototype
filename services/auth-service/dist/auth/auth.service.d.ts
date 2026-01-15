import { Repository } from 'typeorm';
import { User, CreateUserDto, LoginDto } from '@shared/libs';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<any>;
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    createToken(user: any): {
        access_token: string;
    };
}
