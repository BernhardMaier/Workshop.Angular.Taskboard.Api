import { Module } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { join } from 'path';
import { ChatGateway } from './chat.gateway';
import { ChatMessagesService } from './lib/chat-messages.service';

const database = join(__dirname, '..', '..', 'database');

@Module({
  providers: [
    ChatGateway,
    {
      provide: ChatMessagesService,
      useValue: new ChatMessagesService(
        new JsonDB(`${database}/chat-messages`, true, true)
      ),
    },
  ],
})
export class ChatModule {}
