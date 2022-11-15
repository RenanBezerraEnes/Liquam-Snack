/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSnackDto } from './dto/create-snack.dto';
import { SnackPagination } from './dto/pagination-snack.dto';
import { ISnackBody } from './interface/snackInterface';
import { InjectModel } from '@nestjs/mongoose';
import { Snack, SnackDoc } from './entities/snack.entity';
import { Error, Model } from 'mongoose';

@Injectable()
export class SnacksService {
  constructor(@InjectModel(Snack.name) private SnackModel: Model<SnackDoc>) {}

  async create(createSnackDto: CreateSnackDto): Promise<Snack> {
    return await new this.SnackModel({
      ...createSnackDto,
      createdAt: new Date(),
    }).save();
  }

  async findAll({
    size = 10,
    page = 1,
  }: SnackPagination): Promise<ISnackBody[]> {
    const pagination = page < 2 ? 0 : page * size;
    const filterData = await this.SnackModel.find(
      {
        $and: [
          {
            price: {
              $gte: 150,
            },
          },
          {
            price: {
              $lte: 300,
            },
          },
        ],
      },
      {},
      { skip: pagination, limit: size },
    );

    function compare(a: ISnackBody, b: ISnackBody) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    }

    const data = filterData.sort(compare);
    return data;
  }

  async findOne(id: string): Promise<Snack> {
    const snackDB = await this.SnackModel.findOne({ _id: id });
    if (!snackDB) {
      throw new NotFoundException();
    }
    return snackDB;
  }

  async remove(id: string) {
    const snackDB = await this.findOne(id);
    try {
      if (snackDB) {
        await this.SnackModel.deleteOne({ _id: id });
      }
    } catch (error) {
      throw new Error(error.message);
    }

    return `Snack with id:${id} removed`;
  }
}
