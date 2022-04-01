import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';

@Module({
  imports: [CourseModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/project'),
  ]
  
})
export class AppModule {}
