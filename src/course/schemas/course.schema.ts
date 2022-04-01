import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

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

  @Prop()
  contentRaw: string[];

  @Prop()
  metadataRaw: [];

  @Prop()
  category: string[];

  @Prop({
    type: [
      {
        text: { type: String, default: '' },
        mark: { type: Number, default: 5.0 },
      },
    ],
  })
  comments: [];

  @Prop({ type: Number, default: 0 })
  price: number;

  @Prop({ type: Number, default: 0 })
  time: number;

  @Prop({ type: Number, default: 0 })
  participants: number;

  @Prop({ type: Number, default: 5.0 })
  rating: number;

  @Prop({ type: [{ type: String }] })
  tags: string[];

  @Prop({ type: [{ type: String }] })
  authors: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
