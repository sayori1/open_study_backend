import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from './course.schema';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  courses: Course[];
}

export const TagSchema = SchemaFactory.createForClass(Tag);
