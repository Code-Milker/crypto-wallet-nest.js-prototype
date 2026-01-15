import { Module } from '@nestjs/common';
import { SigningService } from './signing.service';
import { SigningController } from './signing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Signature } from '@shared/libs';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Signature]), HttpModule],
  controllers: [SigningController],
  providers: [SigningService],
})
export class SigningModule {}
