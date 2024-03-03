import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  userId: String;

  @Prop()
  sessionId: String;

  @Prop()
  numberSeat: String;

  @Prop()
  price: Number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
