/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { mockData } from 'MockData';
import { CreateSnackDto } from './dto/create-snack.dto';
import { ISnackBody } from './snackInterface';

@Injectable()
export class SnacksService {
  async create(createSnackDto: CreateSnackDto) {
    mockData.push({
      id: Math.floor(Math.random() * 100),
      name: createSnackDto.name,
      description: createSnackDto.description,
      price: createSnackDto.price,
      img: createSnackDto.img,
    });

    return mockData
  }

  async findAll() {
    const filterData = [];
    mockData.forEach((data: ISnackBody, index: number) => {
      if (data.price >= 150 && data.price <= 300) {
        filterData.push(data);
      }
    });

    function compare(a: ISnackBody, b: ISnackBody) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    }

    return {
      data: filterData.sort(compare),
    };;
  }

  async findOne(id: number): Promise<ISnackBody> {
    const snackDB = await mockData.find((data: ISnackBody) => data.id === id);
    if(!snackDB) {
      throw new NotFoundException();
    }
    return snackDB
  }

  async remove(id: number) {
    const removeSnack = await mockData.findIndex((data: ISnackBody) => data.id === id);
    if(removeSnack ===-1) {
      throw new NotFoundException(`This snack with id:${id} does not exist`)
    }

    mockData.splice(removeSnack, 1)

    return `Snack with id:${id} removed`
  }
}
