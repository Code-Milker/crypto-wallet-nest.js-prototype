import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Wallet, User } from '@shared/libs';
import { KeyStorageModule } from './key-storage/key-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database.sqlite',
      entities: [Wallet, User],
      synchronize: true,
    }),
    KeyStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
