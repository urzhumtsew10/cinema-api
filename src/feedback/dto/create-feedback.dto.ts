import { IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  userId: string;

  @IsString()
  movieId: string;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}
