import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './schema/lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Page, PageDocument } from './schema/page.schema';
import { Course, CourseDocument } from '../course/schemas/course.schema';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    @InjectModel(Page.name) private pageModel: Model<PageDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}
  async create(dto: CreateLessonDto) {
    let lesson = await this.lessonModel.create(dto);
    let course = await this.courseModel.findById(dto.courseId);
    course.lessons.push(lesson);
    course.save();
  }

  async getOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.lessonModel.findById(id).populate('pages');
  }

  async getOfCourse(id: mongoose.Schema.Types.ObjectId) {
    let course = await this.courseModel.findById(id).populate('lessons');
    return course.lessons;
  }

  async delete(id: mongoose.Schema.Types.ObjectId) {
    return await this.lessonModel.findByIdAndDelete(id);
  }

  async createPage(dto: CreatePageDto) {
    let page = await this.pageModel.create(dto);
    let lesson = await this.lessonModel.findById(dto.lesson);
    lesson.pages.push(page);
    lesson.save();
  }

  async editPage(id, dto: CreatePageDto) {
    let lesson = await this.pageModel.findByIdAndUpdate(id, { $set: dto });
    return lesson;
  }

  async deletePage(id) {
    let lesson = await this.pageModel.findByIdAndDelete(id);
    return lesson;
  }

  async getPage(id) {
    let lesson = await this.pageModel.findById(id);
    return lesson;
  }

  async save(id, dto: CreateLessonDto) {
    let lesson = await this.lessonModel.findByIdAndUpdate(id, { $set: dto });
    for (let page of dto.pages) {
      await this.pageModel.findByIdAndUpdate(page._id, { $set: page });
    }
    return lesson;
  }
}
