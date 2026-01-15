import { IsString } from "class-validator";

export class SignMessageDto {
  @IsString()
  message: string;
}
