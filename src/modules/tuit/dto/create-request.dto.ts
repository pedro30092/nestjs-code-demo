import { IsObject, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities';

//Good practice to hanlde requestDto inside controllers
export class CreateRequestDto {
  //Injectors from class-validator works as a contraint, similar to Asserts (php)
  @IsString()
  readonly message: string;

  //Partial is a generic class and will work to achieve required data points from request
  @IsObject()
  readonly user: Partial<User>;
}
