import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { KeyStorageService } from './key-storage.service';

@Controller('keys')
export class KeyStorageController {
  constructor(private keyStorageService: KeyStorageService) {}

  @Post(':walletId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async store(
    @Param('walletId') walletId: number,
    @Body('encryptedPrivateKey') encryptedPrivateKey: string,
  ) {
    await this.keyStorageService.storeEncryptedKey(
      walletId,
      encryptedPrivateKey,
    );
    return { success: true };
  }

  @Get(':walletId')
  async get(@Param('walletId') walletId: number) {
    const encryptedPrivateKey =
      await this.keyStorageService.getEncryptedKey(walletId);
    return { encryptedPrivateKey };
  }
}
