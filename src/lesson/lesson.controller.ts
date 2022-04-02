import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { LessonService } from './lesson.service';

@Controller('/lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateLessonDto) {
    return this.lessonService.create(dto);
  }

  @Get('all/:id')
  getOfCourse(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.lessonService.getOfCourse(id);
  }

  @Get(':id')
  getOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.lessonService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.lessonService.delete(id);
  }

  @Post('/page')
  createPage(@Body() dto: CreatePageDto) {
    return this.lessonService.createPage(dto);
  }

  @Put(':id')
  saveLesson(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() dto: CreateLessonDto,
  ) {
    console.log(dto);
    return this.lessonService.save(id, dto);
  }

  @Put('/page/:id')
  async editPage(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    dto: CreatePageDto,
  ) {
    let lesson = this.lessonService.editPage(id, dto);
    return lesson;
  }

  @Delete('/page/:id')
  async deletePage(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    let lesson = this.lessonService.deletePage(id);
    return lesson;
  }

  @Get('/page/:id')
  async getPage(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    let lesson = this.lessonService.getPage(id);
    return lesson;
  }
}
