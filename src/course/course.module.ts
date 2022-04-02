import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
