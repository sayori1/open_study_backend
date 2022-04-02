import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Course } from '../../course/schemas/course.schema';
import { Lesson } from '../../lesson/schema/lesson.schema';
import { User } from './user.schema';

export type UserCourseDocument = UserCourse & Document;

@Schema()
export class UserCourse {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' })
  completedLessons: Lesson[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const UserCourseSchema = SchemaFactory.createForClass(UserCourse);
