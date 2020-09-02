import { Module } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { join } from 'path';
import { GuidGuard } from './lib/guards/guid.guard';
import { TasksService } from './lib/tasks.service';
import { TasksController } from './tasks.controller';

const database = join(__dirname, '..', '..', 'database');

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TasksService,
      useValue: new TasksService(new JsonDB(`${database}/tasks`, true, true)),
    },
    GuidGuard,
  ],
})
export class TasksModule {}
