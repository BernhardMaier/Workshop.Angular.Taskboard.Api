import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Either } from 'pure-ts/adts/Either';
import { Maybe } from 'pure-ts/adts/Maybe';
import { Task } from '../models/task';
import { TasksJsonDB } from '../models/tasks-json-db';

function tryTo<T>(action: {
  resolve: () => T;
  orYield: (err: Error) => HttpException;
}): Either<HttpException, T> {
  return Either.encase(action.resolve).mapLeft(action.orYield);
}

export class MissingGuid extends BadRequestException {
  constructor() {
    super('Please provide a valid Guid.');
  }
}

export class NoTaskFound extends NotFoundException {
  constructor(givenGuid: string) {
    super(`Could not find task having the identifier "${givenGuid}".`);
  }
}

@Injectable()
export class TasksService {
  constructor(private _taskDb: JsonDB) {}

  addOne(task: Task) {
    this._taskDb.push(`/${task.guid}`, task);
  }

  getAll(): Task[] {
    const tasks: TasksJsonDB = this._taskDb.getData('/');
    return Object.keys(tasks).map((guid) => tasks[guid]);
  }

  getSingle(guid: string): Either<HttpException, Task> {
    return Maybe.of(guid)
      .toEither(new MissingGuid())
      .chain((value) =>
        tryTo<Task>({
          resolve: () => this._taskDb.getData(`/${value}`),
          orYield: () => new NoTaskFound(guid),
        })
      );
  }

  create(task: Task) {
    this._taskDb.push(`/${task.guid}`, task);
  }

  reset(guid: string) {
    this._taskDb.push(
      `/${guid}`,
      { isComplete: false, isInProgress: false },
      false
    );
  }

  complete(guid: string) {
    this._taskDb.push(
      `/${guid}`,
      { isComplete: true, isInProgress: false },
      false
    );
  }

  proceed(guid: string) {
    this._taskDb.push(
      `/${guid}`,
      { isComplete: false, isInProgress: true },
      false
    );
  }

  favor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavorite: true }, false);
  }

  disfavor(guid: string) {
    this._taskDb.push(`/${guid}`, { isFavorite: false }, false);
  }

  remove(guid: string) {
    return this.getSingle(guid).ifRight(() => this._taskDb.delete(`/${guid}`));
  }
}
