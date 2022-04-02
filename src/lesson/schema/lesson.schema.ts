import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Page } from './page.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ default: 'Heading' })
  heading: string;

  @Prop({ default: 'Untitled' })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page', default: [] }],
  })
  pages: Page[];

  @Prop()
  image: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
