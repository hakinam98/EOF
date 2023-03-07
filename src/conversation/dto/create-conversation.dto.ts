import { ApiProperty } from '@nestjs/swagger';
export class CreateConversationDto {
  @ApiProperty()
  user_one: number;
  @ApiProperty()
  user_two: number;
}

export class ConversationReplyDto {
  @ApiProperty()
  conversation_id: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  userId: number;
}
