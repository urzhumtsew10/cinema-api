import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModule: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const uniqueActorsId = [];
    createMovieDto.actors.forEach((actor) => {
      if (!uniqueActorsId.includes(actor.actorId))
        uniqueActorsId.push(actor.actorId);
    });
    if (uniqueActorsId.length !== createMovieDto.actors.length) return false;
    return await new this.movieModule({
      ...createMovieDto,
      videoPath: `https://vercel.com/urzhumtsew10/cinema-api/movie/file/${createMovieDto.videoName}`,
      imgPath: `https://vercel.com/urzhumtsew10/cinema-api/movie/file/${createMovieDto.imgName}`,
    }).save();
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieModule.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.movieModule.findById(id);
    } catch {
      return false;
    }
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentMovie = await this.movieModule.findById(id);
      return this.movieModule.deleteOne({ _id: currentMovie._id });
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
