import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  movieId: String;

  @IsNotEmpty()
  date: String;

  @IsNotEmpty()
  time: String;
}
