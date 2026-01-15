import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '@shared/libs';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.createToken(req.user);
  }
}
