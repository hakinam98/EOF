import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationGateway } from './conversation.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConversationController } from './conversation.controller';

@Module({
  providers: [ConversationGateway, ConversationService],
  imports: [PrismaModule],
  controllers: [ConversationController],
})
export class ConversationModule {}
