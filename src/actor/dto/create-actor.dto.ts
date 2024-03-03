import { IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  imgName: String;

  @IsString()
  name: String;

  @IsString()
  surname: String;
}
