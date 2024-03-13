import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  userId: string;

  @Prop()
  sessionId: string;

  @Prop()
  numberSeats: string[];

  @Prop()
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
