import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';
import { UserCourse, UserCourseSchema } from './schemas/usercourse.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserCourse.name, schema: UserCourseSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
