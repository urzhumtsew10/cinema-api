import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './session.schema';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { Movie, MovieDocument } from 'src/movie/movie.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModule: Model<SessionDocument>,
    @InjectModel(Movie.name) private movieModule: Model<MovieDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const checkMovieId = await this.movieModule
      .findById(createSessionDto.movieId)
      .catch((err) => {
        return;
      });
    if (checkMovieId) {
      return await new this.sessionModule(createSessionDto).save();
    } else {
      return false;
    }
  }
  async findAll() {
    return await this.sessionModule.find().exec();
  }
  async findOne(id: string) {
    return await this.sessionModule.findById(id);
  }
  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }
  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentSession = await this.sessionModule.findById(id);
      return await this.sessionModule.deleteOne({ _id: currentSession._id });
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
