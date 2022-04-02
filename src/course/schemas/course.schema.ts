import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Tag } from './tag.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop({ type: {} })
  lessons: object;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Number, default: 0 })
  time: number;

  @Prop({ type: Number, default: 0 })
  participants: number;

  @Prop({ type: Number, default: 5.0 })
  rating: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({ type: [{ type: String }] })
  authors: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
