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
    minPrice,
    maxPrice,
    order,
  }: SnackPagination) {
    const pagination = page < 2 ? 0 : page * size;
    const filterMinPrice = minPrice ? { price: { $gte: minPrice } } : {};
    const filterMaxPrice = maxPrice ? { price: { $lte: maxPrice } } : {};
    const sorter = order?.split(',').reduce((acc, curr) => {
      const value = curr[0] === '-' ? -1 : 1;
      return {
        ...acc,
        [curr.replace('-', '')]: value,
      };
    }, {});

    const [listSnack, totalSnack] = await Promise.all([
      this.SnackModel.find(
        {
          $and: [filterMinPrice, filterMaxPrice],
        },
        {},
        { skip: pagination, limit: size },
      ).sort(sorter ? sorter : { createdAt: -1 }),
      this.SnackModel.count(),
    ]);

    return { data: listSnack, totalItem: totalSnack, page, size: Number(size) };
  }

  async findOne(id: string): Promise<Snack> {
    const snackDB = await this.SnackModel.findOne({ _id: id });
    if (!snackDB) {
      throw new NotFoundException(`id:${id}, not found`);
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
      throw new NotFoundException(`id:${id}, not found`);
    }

    return `Snack with id:${id} removed`;
  }
}
