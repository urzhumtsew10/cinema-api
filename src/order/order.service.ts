import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { Session, SessionDocument } from 'src/session/session.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModule: Model<OrderDocument>,
    @InjectModel(Session.name) private sessionModule: Model<SessionDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const checkSessionId: Session = await this.sessionModule.findById(
        createOrderDto.sessionId,
      );
      if (checkSessionId) {
        return await new this.orderModule({
          ...createOrderDto,
        }).save();
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async findAll() {
    return await this.orderModule.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.orderModule.findById(id);
    } catch {
      return false;
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentOrder = await this.orderModule.findById(id);
      return await this.orderModule.deleteOne({ _id: currentOrder._id });
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
