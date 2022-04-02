import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Lesson } from 'src/lesson/schema/lesson.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ default: 'untitled' })
  name: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }] })
  lessons: Lesson[];

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

  @Prop()
  tags: string[];

  @Prop({ type: [{ type: String }] })
  authors: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
