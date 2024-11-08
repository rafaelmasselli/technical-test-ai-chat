import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ChatDto } from 'src/modules/chat/dto/chatDto';
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.join(__dirname, '../database/database.sqlite'),
  entities: [ChatDto],
  synchronize: true,
  logging: true,
};
