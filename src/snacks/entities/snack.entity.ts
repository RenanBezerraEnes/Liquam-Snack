import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnackDoc = Snack & Document;
@Schema({ timestamps: true })
export class Snack {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  img: string;
}

export const SnackSchema = SchemaFactory.createForClass(Snack);
