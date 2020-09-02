import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GuidGuard } from './lib/guards/guid.guard';
import { TasksService } from './lib/tasks.service';

function bailOut(err: HttpException) {
  throw err;
}

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private _tasks: TasksService) {}

  @Get()
  all() {
    return this._tasks.getAll();
  }

  @Get(':guid?')
  @UseGuards(GuidGuard)
  single(@Param('guid') guid: string) {
    return this._tasks.getSingle(guid).ifLeft(bailOut).extract();
  }

  @Post()
  create(@Body() task) {
    return this._tasks.addOne(task);
  }

  @Delete(':guid?')
  @UseGuards(GuidGuard)
  remove(@Param('guid') guid: string) {
    return this._tasks.remove(guid).ifLeft(bailOut);
  }

  @Put('favor/:guid')
  favor(@Param('guid') guid: string) {
    return this._tasks.favor(guid);
  }

  @Put('disfavor/:guid')
  disfavor(@Param('guid') guid: string) {
    return this._tasks.disfavor(guid);
  }

  @Put('complete/:guid')
  complete(@Param('guid') guid: string) {
    return this._tasks.complete(guid);
  }

  @Put('proceed/:guid')
  proceed(@Param('guid') guid: string) {
    return this._tasks.proceed(guid);
  }
}
