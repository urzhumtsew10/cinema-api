import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  // @Get('/file/:videoName')
  // getFile(@Param('videoName') video): StreamableFile {
  //   const file = createReadStream(join('./uploads', `${video}`));
  //   return new StreamableFile(file);
  // }

  // @Get('/poster/:imgName')
  // getPoster(@Param('imgName') img): StreamableFile {
  //   const file = createReadStream(join('./uploads', `${img}`));
  //   return new StreamableFile(file);
  // }

  // @Post('/file')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         callback(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file) {}

  // @Post('/poster')
  // @UseInterceptors(
  //   FileInterceptor('img', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, callback) => {
  //         callback(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // uploadPoster(@UploadedFile() file) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
