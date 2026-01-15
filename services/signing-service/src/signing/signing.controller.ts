import { Controller, Post, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SigningService } from './signing.service';
import { SignMessageDto } from '@shared/libs';

@Controller('sign')
export class SigningController {
  constructor(private signingService: SigningService) {}

  @Post(':walletId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async sign(@Param('walletId') walletId: number, @Body() dto: SignMessageDto) {
    return this.signingService.sign(walletId, dto);
  }
}
