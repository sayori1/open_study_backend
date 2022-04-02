import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../course/schemas/course.schema';
import { AuthModule } from '../auth/auth.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { Lesson, LessonSchema } from './schema/lesson.schema';
import { Page, PageSchema } from './schema/page.schema';

@Module({
  providers: [LessonService],
  controllers: [LessonController],
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => AuthModule),
  ],
})
export class LessonModule {}
