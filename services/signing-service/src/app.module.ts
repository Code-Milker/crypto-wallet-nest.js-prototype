import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Signature, Wallet, User } from '@shared/libs';
import { SigningModule } from './signing/signing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database.sqlite',
      entities: [Signature, Wallet, User],
      synchronize: true,
    }),
    SigningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
