import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Lesson } from './lesson.schema';

export type PageDocument = Page & Document;

@Schema()
export class Page {
  @Prop()
  content: [];

  @Prop({ default: '' })
  contentRaw: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  lesson: Lesson; //parent
}

export const PageSchema = SchemaFactory.createForClass(Page);
