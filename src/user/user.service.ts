import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ObjectIdColumn } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModule: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async auth(userDto: CreateUserDto) {
    const userByEmail = (await this.findAll()).find(
      (user) => user.email === userDto.email,
    );
    const isMatchPasswords = await argon2.verify(
      userByEmail.password,
      userDto.password,
    );
    if (userByEmail && isMatchPasswords) {
      return userByEmail;
    }
    return false;
  }

  async register(userDto: CreateUserDto) {
    const userByEmail = (await this.findAll()).filter(
      (user) => user.email === userDto.email,
    )[0];
    if (userByEmail) return false;

    return new this.userModule({
      ...userDto,
      password: await argon2.hash(userDto.password),
      token: await this.jwtService.signAsync({ email: userDto.email }),
      role: 'user',
    }).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModule.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.userModule.findById(id);
    } catch {
      return false;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.findOne(id);
    if (!currentUser) return false;
    await this.userModule.findByIdAndUpdate(currentUser._id, {
      password: await argon2.hash(updateUserDto.password),
    });
    return true;
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const currentUser = await this.userModule.findById(id);
      return await this.userModule.deleteOne({ _id: currentUser._id });
    } catch {
      return {
        acknowledged: false,
        deletedCount: 0,
      };
    }
  }
}
