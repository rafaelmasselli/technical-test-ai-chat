import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChatDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({
    type: 'text',
  })
  role: 'user' | 'ai';

  @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' }) 
  timestamp: Date;
}
