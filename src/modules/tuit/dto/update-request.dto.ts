import { IsString } from "class-validator";

export class UpdateRequestDto {
  @IsString()
  readonly message: string;
}
