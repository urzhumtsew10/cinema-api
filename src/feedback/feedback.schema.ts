import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop()
  userId: string;

  @Prop()
  movieId: string;

  @Prop()
  rating: number;

  @Prop()
  comment: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
