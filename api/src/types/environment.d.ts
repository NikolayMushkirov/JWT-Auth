export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      CLIENT_URL: string;
      PORT: number;
      ENV: "test" | "dev" | "prod";
    }
  }
}
