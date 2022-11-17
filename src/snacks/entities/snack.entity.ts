import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SnackDoc = Snack & Document;
@Schema({
  timestamps: true,
  // Remove response in the front
  // toJSON: {
  //   virtuals: true,
  //   transform: function (doc: any, ret: any) {
  //     delete ret.name;
  //   },
  // },
})
export class Snack {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  img: string;
}

export const SnackSchema = SchemaFactory.createForClass(Snack);
