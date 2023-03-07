import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ConversationService } from './conversation.service';
import {
  CreateConversationDto,
  ConversationReplyDto,
} from './dto/create-conversation.dto';
import { Server, Socket } from 'socket.io';
// import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ConversationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly conversationService: ConversationService) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  @SubscribeMessage('createConversation')
  create(@MessageBody() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @SubscribeMessage('createConversationReply')
  async createReply(
    @MessageBody() createConversationReplyDto: ConversationReplyDto,
  ) {
    const message = await this.conversationService.createReply(
      createConversationReplyDto,
    );
    return this.server.emit('recMessage', message);
  }

  @SubscribeMessage('findOneConversation')
  async findOne(@MessageBody() data: { conversation_id: number }) {
    const messages = await this.conversationService.findOne(
      data.conversation_id,
    );
    return this.server.emit('recMessages', messages);
  }

  @SubscribeMessage('findAllConversations')
  async findAll(@MessageBody() data: { user_id: number }) {
    const conversations = await this.conversationService.findAll(data.user_id);
    return this.server.emit('recConversations', conversations);
  }
  // @SubscribeMessage('updateConversation')
  // update(@MessageBody() conversationReplyDto: ConversationReplyDto) {
  //   return this.conversationService.update(
  //     conversationReplyDto.conversation_id,
  //     conversationReplyDto,
  //   );
  // }

  // @SubscribeMessage('removeConversation')
  // remove(@MessageBody() id: number) {
  //   return this.conversationService.remove(id);
  // }
}
