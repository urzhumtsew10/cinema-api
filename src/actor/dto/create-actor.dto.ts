import { IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  imgPath: String;

  @IsString()
  name: String;

  @IsString()
  surname: String;
}
