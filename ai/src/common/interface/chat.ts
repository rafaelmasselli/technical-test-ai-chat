interface IChat {
  id: string;
  message: string;
  role: 'ai' | 'user';
  timestamp: Date;
}

export type { IChat };
