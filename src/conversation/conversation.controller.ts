import { Controller, Get, Query, Body, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  async getAllConversation(@Query() data: { user_id: number }) {
    const conversations = await this.conversationService.findAll(data.user_id);
    return conversations;
  }
  @Get(':id')
  async getAllMessages(@Param() params): Promise<any> {
    console.log(typeof Number(params.id));
    const messages = await this.conversationService.findOne(Number(params.id));
    return messages;
  }
}
