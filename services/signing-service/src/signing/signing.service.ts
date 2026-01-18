import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import {
  SignMessageDto,
  decryptPrivateKey,
  signMessage,
  Signature,
} from '@shared/libs';
@Injectable()
export class SigningService {
  constructor(
    @InjectRepository(Signature)
    private signaturesRepository: Repository<Signature>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async sign(walletId: number, dto: SignMessageDto): Promise<string> {
    // Retrieve encrypted key from Key Storage
    const keyStorageUrl = this.configService.get('KEY_STORAGE_URL');
    const response = await lastValueFrom(
      this.httpService.get(`${keyStorageUrl}/${walletId}`),
    );
    const encryptedPrivateKey = response.data.encryptedPrivateKey;
    if (!encryptedPrivateKey) {
      throw new Error('Key not found');
    }
    // Decrypt in-memory
    const privateKey = decryptPrivateKey(encryptedPrivateKey);
    // Sign (ensure sync call)
    // ... rest of method
    const signature = await signMessage(privateKey, dto.message); // Ensure this is sync; await if async
    const messageHash = dto.message; // Or hash it
    const audit = this.signaturesRepository.create({
      wallet: { id: walletId },
      messageHash,
      signature,
    });
    await this.signaturesRepository.save(audit);
    // ...
    return signature;
  }
}
