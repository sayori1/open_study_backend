import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { CourseService } from './course.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('page') page: number) {
    return this.courseService.getAll(count, page);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.courseService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.getOne(id);
  }

  @Get(':tag')
  getByTag(@Query('tag') tag: string) {
    return this.courseService.getByTag(tag);
  }

  @Delete(':id')
  delete(@Query('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.courseService.addComment(dto);
  }
}
