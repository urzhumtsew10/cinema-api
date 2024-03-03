import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActorDocument = Actor & Document;

@Schema()
export class Actor {
  @Prop()
  imgPath: String;

  @Prop()
  name: String;

  @Prop()
  surname: String;
}

export const ActorSchema = SchemaFactory.createForClass(Actor);
