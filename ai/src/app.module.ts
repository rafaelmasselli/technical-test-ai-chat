import { Module } from '@nestjs/common';
import { LoggerModule } from './core/logger/logger.module';
import { ChatModule } from './modules/chat/chat.module';

import * as admin from 'firebase-admin';
import serviceAccount from '../history-firebase-adminsdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
    } as admin.ServiceAccount),
    databaseURL: 'https://ardent-girder-438901-r2.firebaseio.com',
  });
} else {
  console.log('Firebase já inicializado');
}

@Module({
  imports: [LoggerModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
