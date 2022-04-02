import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Page } from './page.schema';

@Schema()
export class Lesson {
  @Prop()
  heading: string;

  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }] })
  pages: Page[];

  @Prop()
  image: string;
}
