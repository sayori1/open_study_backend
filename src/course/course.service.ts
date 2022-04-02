import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
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
    const course = await this.courseModel.findById(id).populate('lessons');
    return course;
  }

  async delete(id) {
    const course = await this.courseModel.findByIdAndDelete(id);
    return course._id;
  }

  async getByTag(tag) {
    const coursesWithTag = [];
    const courses = await this.courseModel.find({});
    for (let course of courses) {
      if (course.tags.includes(tag)) coursesWithTag.push(tag);
    }
    return coursesWithTag;
  }

  async addComment(dto: CreateCommentDto) {
    const course = await this.courseModel.findById(dto.courseId);
    const comment = await this.commentModel.create({ ...dto });
    course.comments.push(comment._id);
    await course.save();
    return comment;
  }

  async save(id, dto: CreateCourseDto) {
    let course = await this.courseModel.findByIdAndUpdate(id, { $set: dto });
    return course;
  }
}
