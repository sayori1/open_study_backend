import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { FileModule } from './file/file.module';
import { LessonController } from './lesson/lesson.controller';
import { LessonModule } from './lesson/lesson.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CourseModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/project'),
    LessonModule,
    AuthModule,
    UsersModule,
    FileModule,
  ],
  controllers: [LessonController],
})
export class AppModule {}
