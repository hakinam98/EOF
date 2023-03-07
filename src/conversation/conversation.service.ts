import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateConversationDto,
  ConversationReplyDto,
} from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  create(createConversationDto: CreateConversationDto) {
    return this.prisma.conversation.create({ data: createConversationDto });
  }

  createReply(createConversationReplyDto: ConversationReplyDto) {
    return this.prisma.conversation_reply.create({
      data: createConversationReplyDto,
    });
  }
  // createReply(createConversationReplyDto: ConversationReplyDto) {
  //   return this.prisma.conversation.create({
  //     data: {
  //       conversation_replys: {
  //         create: createConversationReplyDto,
  //       },
  //     },
  //   });
  // }
  findAll(user_id: number) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          { user_one: { equals: user_id } },
          { user_two: { equals: user_id } },
        ],
      },
    });
  }

  findOne(conversation_id: number) {
    return this.prisma.conversation.findUnique({
      where: {
        id: conversation_id,
      },
      include: {
        conversation_replys: true,
      },
    });
  }

  // update(id: number, conversationReplyDto: ConversationReplyDto) {
  //   return `This action updates a #${id} conversation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} conversation`;
  // }
}
