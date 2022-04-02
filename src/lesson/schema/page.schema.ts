import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Lesson } from './lesson.schema';

@Schema()
export class Page {
  @Prop()
  content: [];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'  })
  lesson: Lesson;
}
