interface IClients {
  phone_id: string;
  name: string;
  lastname: string;
  preferences: {
    audio: boolean;
    init: boolean;
  };
}

export type { IClients };
