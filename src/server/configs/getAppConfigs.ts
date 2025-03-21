import * as dotenv from 'dotenv';

export interface IAppConfigs {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  MONGO_URL: string;
  MONGO_DB_NAME: string;
}

function getAppConfigs() {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
  }

  const { error } = dotenv.config();

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      MONGO_URL: process.env.MONGO_URL!,
      MONGO_DB_NAME: process.env.MONGO_DB_NAME!,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    };
  } else {
    throw new Error('Only development available');
  }
}

export const appConfigs: IAppConfigs = getAppConfigs();
