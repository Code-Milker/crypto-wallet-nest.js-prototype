import { Injectable } from '@nestjs/common';
import { User } from '@shared/libs';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
