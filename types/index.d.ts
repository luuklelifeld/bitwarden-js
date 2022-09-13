declare global {
    namespace NodeJS {
        interface ProcessEnv {
          BW_EMAIL: string
          BW_PASSWORD: string
          BW_CLIENT_ID: string
          BW_CLIENT_SECRET: string
        }
      }
}

export {}