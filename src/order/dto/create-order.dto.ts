import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  numberSeats: string[];

  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  price: number;
}
