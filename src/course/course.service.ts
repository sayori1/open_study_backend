import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = await this.courseModel.create({ ...dto });
    return course;
  }

  async getAll(count, page) {
    const courses = await this.courseModel
      .find()
      .skip(Number(count * page))
      .limit(Number(count));
    return courses;
  }

  async search(query) {
    const courses = await this.courseModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return courses;
  }

  async getOne(id) {
    const course = await this.courseModel.findById(id);
    return course;
  }

  async delete(id) {
    const course = await this.courseModel.findByIdAndDelete(id);
    return course._id;
  }
}
