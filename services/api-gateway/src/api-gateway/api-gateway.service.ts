import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginDto, SignMessageDto } from '@shared/libs';

@Injectable()
export class ApiGatewayService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const authUrl = this.configService.get('AUTH_URL');
    const response = await lastValueFrom(
      this.httpService.post(`${authUrl}/register`, createUserDto),
    );
    return response.data;
  }

  async login(loginDto: LoginDto) {
    const authUrl = this.configService.get('AUTH_URL');
    const response = await lastValueFrom(
      this.httpService.post(`${authUrl}/login`, loginDto),
    );
    return response.data;
  }

  async createWallet(userId: number) {
    const walletUrl = this.configService.get('WALLET_URL');
    const response = await lastValueFrom(
      this.httpService.post(walletUrl, {}, { params: { userId } }),
    );
    return response.data;
  }

  async listWallets(userId: number) {
    const walletUrl = this.configService.get('WALLET_URL');
    const response = await lastValueFrom(
      this.httpService.get(walletUrl, { params: { userId } }),
    );
    return response.data;
  }

  async signMessage(walletId: number, dto: SignMessageDto) {
    const signUrl = this.configService.get('SIGN_URL');
    const response = await lastValueFrom(
      this.httpService.post(`${signUrl}/${walletId}`, dto),
    );
    return response.data;
  }
}
