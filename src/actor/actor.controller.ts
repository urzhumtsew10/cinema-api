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
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Post('/img')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './tmp/uploads',
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    if (file) return true;
    return false;
  }

  @Get('/img/:imgName')
  getFile(@Param('imgName') img): StreamableFile {
    const file = createReadStream(join('./tmp/uploads', `${img}`));
    return new StreamableFile(file);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(id);
  }
}
