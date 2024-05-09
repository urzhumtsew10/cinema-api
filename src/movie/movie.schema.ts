import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

interface IActor {
  actorId: String;
  role: String;
}

@Schema()
export class Movie {
  @Prop()
  title: String;

  @Prop()
  description: String;

  @Prop()
  genre: String;

  @Prop()
  country: String;

  @Prop()
  actors: IActor[];

  @Prop()
  videoId: String;

  @Prop()
  imgPath: String;

  @Prop()
  restriction: Number;

  @Prop()
  releaseDate: String;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
