import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { ISnackBody } from './snackInterface';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snacksService: SnacksService) {}

  @Post()
  async create(@Body() createSnackDto: CreateSnackDto) {
    return await this.snacksService.create(createSnackDto);
  }

  @Get()
  async findAll() {
    return await this.snacksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<ISnackBody> {
    return await this.snacksService.findOne(id);
  }

  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<string> {
    return await this.snacksService.remove(id);
  }
}
