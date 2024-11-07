import { EntityRepository, Repository } from 'typeorm';
import { ChatDto } from '../dto/chatDto';

@EntityRepository(ChatDto)
export class ChatDtoRepository extends Repository<ChatDto> {}
