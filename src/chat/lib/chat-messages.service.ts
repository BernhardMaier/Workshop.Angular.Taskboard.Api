import { Injectable } from '@nestjs/common';
import JsonDB from 'node-json-db';
import { Observable, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { ChatMessage, PersistedChatMessage } from '../models';

@Injectable()
export class ChatMessagesService {
  constructor(private _db: JsonDB) {}

  all(): Observable<ChatMessage[]> {
    return of(this._db.getData('/')).pipe(
      map(persistedMessages => this.toMessageCollection(persistedMessages))
    );
  }

  addOne(message: ChatMessage) {
    return of(this._db.push(`/${message.guid}`, message)).pipe(mapTo(message));
  }

  removeAll() {
    return of(this._db.delete(`/`));
  }

  private toMessageCollection(persistedMessages: PersistedChatMessage) {
    return Object.keys(persistedMessages).map(key => persistedMessages[key]);
  }
}
