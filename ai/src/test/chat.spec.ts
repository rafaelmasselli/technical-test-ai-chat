import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';
import { ChatService } from '../modules/chat/chat.service';

describe('ChatController (e2e)', () => {
  let app: INestApplication;
  let chatService: ChatService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    chatService = moduleFixture.get<ChatService>(ChatService);
    await app.init();
  });

  it('/chat (POST) - sucesso', async () => {
    const mockMessage = 'Como está o tempo hoje?';
    const mockResponse = 'Está ensolarado!';

    jest.spyOn(chatService, 'handleAiChat').mockResolvedValue(mockResponse);

    const response = await request(app.getHttpServer())
      .post('/chat')
      .send({ message: mockMessage })
      .expect(200);

    expect(response.body.response).toBe(mockResponse);
  });

  it('/chat (POST) - erro', async () => {
    const mockMessage = 'Como está o tempo hoje?';
    jest
      .spyOn(chatService, 'handleAiChat')
      .mockRejectedValue(new Error('Erro ao processar'));

    const response = await request(app.getHttpServer())
      .post('/chat')
      .send({ message: mockMessage })
      .expect(500);

    expect(response.body.error).toBe('Erro ao processar o chat com AI');
  });
});
