import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Lesson } from "src/lesson/schema/lesson.schema";

@Schema()
export class UserCourse{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
    courseId: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'})
    completedLessons: Lesson[];
}