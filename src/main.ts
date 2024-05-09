import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ImATeapotException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);
  const whiteList = [
    'http://localhost:3000',
    'https://cinema-zeta-ochre.vercel.app/',
  ];

  app.enableCors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: function (origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (whiteList.includes(origin) || !!origin.match(/yourdomain\.com$/)) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for', origin);
        callback(new ImATeapotException('Not allowed by CORS'), false);
      }
    },
  });

  await app.listen(3333);
}
bootstrap();
