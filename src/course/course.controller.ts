import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get()
  getAll(@Query('count') count: number, @Query('page') page: number) {
    return this.courseService.getAll(count, page);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('/search')
  search(@Query('query') query: string) {
    return this.courseService.search(query);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get(':id')
  getOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.getOne(id);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get(':tag')
  getByTag(@Query('tag') tag: string) {
    return this.courseService.getByTag(tag);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Query('id') id: mongoose.Schema.Types.ObjectId) {
    return this.courseService.delete(id);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.courseService.addComment(dto);
  }
}
