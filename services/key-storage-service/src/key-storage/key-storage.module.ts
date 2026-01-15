import { Module } from '@nestjs/common';
import { KeyStorageService } from './key-storage.service';
import { KeyStorageController } from './key-storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '@shared/libs';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [KeyStorageController],
  providers: [KeyStorageService],
  exports: [KeyStorageService],
})
export class KeyStorageModule {}
