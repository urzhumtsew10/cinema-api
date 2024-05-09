import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Actor, ActorDocument } from './actor.schema';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor.name) private actorModule: Model<ActorDocument>,
  ) {}

  async create(createActorDto: CreateActorDto) {
    return await new this.actorModule({
      ...createActorDto,
    }).save();
  }

  async findAll() {
    return await this.actorModule.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.actorModule.findById(id);
    } catch {
      return false;
    }
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentActor = await this.actorModule.findById(id);
      return this.actorModule.deleteOne({ _id: currentActor._id }).exec();
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
