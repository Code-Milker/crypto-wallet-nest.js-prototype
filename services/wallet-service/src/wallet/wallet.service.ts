import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Wallet, generateWallet, encryptPrivateKey } from '@shared/libs';
import { MessagePattern } from '@nestjs/microservices';
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  @MessagePattern('create_wallet')
  async create({
    userId,
  }: {
    userId: number;
  }): Promise<{ id: number; publicAddress: string }> {
    const { publicAddress, privateKey } = generateWallet();
    const encryptedPrivateKey = encryptPrivateKey(privateKey);
    const wallet = this.walletsRepository.create({
      user: { id: userId },
      publicAddress,
      encryptedPrivateKey, // Temp; we'll move to Key Storage
    });
    const savedWallet = await this.walletsRepository.save(wallet);
    // Call Key Storage to store encrypted key
    const keyStorageUrl = this.configService.get('KEY_STORAGE_URL');
    await lastValueFrom(
      this.httpService.post(`${keyStorageUrl}/${savedWallet.id}`, {
        encryptedPrivateKey,
      }),
    );
    // Optional: Remove encrypted key from DB after storage if not needed
    await this.walletsRepository.update(savedWallet.id, {
      encryptedPrivateKey: null,
    });
    return { id: savedWallet.id, publicAddress };
  }
  @MessagePattern('list_wallets')
  async findAll({ userId }: { userId: number }): Promise<Wallet[]> {
    return this.walletsRepository.find({ where: { user: { id: userId } } });
  }
  // Add findOne if needed
}
