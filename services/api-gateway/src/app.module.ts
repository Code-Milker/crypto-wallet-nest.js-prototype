import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@shared/libs';
import { JwtStrategy } from './auth/jwt.strategy'; // We'll add this
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    ApiGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
