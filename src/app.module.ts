import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { SessionModule } from './session/session.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { ActorModule } from './actor/actor.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    SessionModule,
    MovieModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://andrew:Pass321@electricitystore.7fcbtjd.mongodb.net/cinema',
    // ),
    FastifyMulterModule,
    OrderModule,
    ActorModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
