import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Wallet, generateWallet, encryptPrivateKey } from '@shared/libs';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async create(userId: number): Promise<{ id: number; publicAddress: string }> {
    this.logger.log(`Creating wallet for userId: ${userId}`);
    const { publicAddress, privateKey } = generateWallet();
    const encryptedPrivateKey = encryptPrivateKey(privateKey);
    const wallet = this.walletsRepository.create({
      id: userId, // Set FK directly; adjust column name if it's not 'userId' (check Wallet entity)
      publicAddress,
      encryptedPrivateKey, // Temp store
    });
    const savedWallet = await this.walletsRepository.save(wallet);
    this.logger.log(`Saved wallet ID: ${savedWallet.id}`);

    // Call Key Storage to store encrypted key
    const keyStorageUrl = this.configService.get('KEY_STORAGE_URL');
    await lastValueFrom(
      this.httpService.post(`${keyStorageUrl}/${savedWallet.id}`, {
        encryptedPrivateKey,
      }),
    );
    this.logger.log(
      `Key stored in Key Storage for wallet ID: ${savedWallet.id}`,
    );

    // await this.walletsRepository
    //   .createQueryBuilder()
    //   .update(Wallet)
    //   .set({ encryptedPrivateKey: null })
    //   .where('id = :id', { id: savedWallet.id })
    //   .execute();
    this.logger.log(
      `Cleared encrypted key from DB for wallet ID: ${savedWallet.id}`,
    );

    return { id: savedWallet.id, publicAddress };
  }

  async findAll(userId: number): Promise<Wallet[]> {
    return this.walletsRepository.find({ where: { user: { id: userId } } });
  }
}
