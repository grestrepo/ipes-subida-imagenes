import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import dotenv from 'dotenv';
dotenv.config();

import { uploadRouter } from './routes';

interface IPath {
  upload: string;
}

export class Server {
  app: Application;
  private port = process.env.PORT || '3000';
  private path: IPath = {
    upload: '/ws-upload/api/v1/upload',
  };

  constructor() {
    this.app = express();

    this.middlewares();

    this.routes();
    this.listen();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  private routes() {
    this.app.use(this.path.upload, uploadRouter);
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.info(`Escuchando puerto ${this.port}`);
    });
  }
}
