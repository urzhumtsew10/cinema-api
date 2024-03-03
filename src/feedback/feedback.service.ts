import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback, FeedbackDocument } from './feedback.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModule: Model<FeedbackDocument>,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto) {
    return await new this.feedbackModule(createFeedbackDto).save();
  }

  async findAll() {
    return await this.feedbackModule.find();
  }

  async findByMovie(id: string) {
    return await this.feedbackModule.find({ movieId: id });
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentFeedback = await this.feedbackModule.findById(id);
      return await this.feedbackModule.deleteOne({ _id: currentFeedback._id });
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
