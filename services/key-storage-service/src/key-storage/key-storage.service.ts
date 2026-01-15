import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '@shared/libs';

@Injectable()
export class KeyStorageService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
  ) {}

  async storeEncryptedKey(
    walletId: number,
    encryptedPrivateKey: string,
  ): Promise<void> {
    await this.walletsRepository.update(walletId, { encryptedPrivateKey });
  }

  async getEncryptedKey(walletId: number): Promise<string | undefined> {
    const wallet = await this.walletsRepository.findOne({
      where: { id: walletId },
    });
    return wallet?.encryptedPrivateKey;
  }
}
