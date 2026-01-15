import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateUserDto, LoginDto, SignMessageDto } from '@shared/libs';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1')
export class ApiGatewayController {
  constructor(private apiGatewayService: ApiGatewayService) {}

  @Post('auth/register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.apiGatewayService.register(createUserDto);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.apiGatewayService.login(loginDto);
  }

  @Post('wallets')
  @UseGuards(AuthGuard('jwt'))
  async createWallet(@Req() req) {
    return this.apiGatewayService.createWallet(req.user.userId);
  }

  @Get('wallets')
  @UseGuards(AuthGuard('jwt'))
  async listWallets(@Req() req) {
    return this.apiGatewayService.listWallets(req.user.userId);
  }

  @Post('sign/:walletId')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async signMessage(
    @Req() req,
    @Param('walletId') walletId: number,
    @Body() dto: SignMessageDto,
  ) {
    // Optional: Check if wallet belongs to user
    return this.apiGatewayService.signMessage(walletId, dto);
  }
}
