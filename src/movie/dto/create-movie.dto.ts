import { IsNotEmpty } from 'class-validator';

interface IActor {
  actorId: String;
  role: String;
}

export class CreateMovieDto {
  @IsNotEmpty()
  title: String;

  @IsNotEmpty()
  description: String;

  @IsNotEmpty()
  genre: String;

  @IsNotEmpty()
  country: String;

  @IsNotEmpty()
  actors: IActor[];

  @IsNotEmpty()
  videoName: String;

  @IsNotEmpty()
  imgName: String;

  @IsNotEmpty()
  restriction: Number;

  @IsNotEmpty()
  releaseDate: String;
}
