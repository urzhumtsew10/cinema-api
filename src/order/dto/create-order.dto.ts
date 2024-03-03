import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: String;

  @IsNotEmpty()
  numberSeat: Number;

  @IsNotEmpty()
  sessionId: String;
}
