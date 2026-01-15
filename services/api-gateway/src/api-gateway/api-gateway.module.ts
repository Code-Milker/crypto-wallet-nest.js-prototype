import { Module } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ApiGatewayController } from './api-gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
