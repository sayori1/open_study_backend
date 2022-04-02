import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { CourseService } from './course.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('/course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  getAll(@Param('count') count: number, @Param('page') page: number) {
    return this.courseService.getAll(count, page);
  }

  @Get('/search')
  search(@Param('query') query: string) {
    return this.courseService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.getOne(id);
  }

  @Get('/tag/:tag')
  getByTag(@Param('tag') tag: string) {
    return this.courseService.getByTag(tag);
  }

  @Delete(':id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.courseService.addComment(dto);
  }

  @Put(':id')
  saveCourse(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() dto: CreateCourseDto,
  ) {
    return this.courseService.save(id, dto);
  }
}
