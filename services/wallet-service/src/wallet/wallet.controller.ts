import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport'; // For JWT auth, add later

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))  // Secure with JWT from Auth Service
  async create(@Param('userId') userId: number) {
    // In real app, get userId from req.user
    return this.walletService.create(userId);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  async findAll(@Param('userId') userId: number) {
    return this.walletService.findAll(userId);
  }
}
