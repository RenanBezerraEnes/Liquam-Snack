import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { ISnackBody } from './interface/snackInterface';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { SnackPagination } from './dto/pagination-snack.dto';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snacksService: SnacksService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Post new snacks' })
  @ApiBody({ type: CreateSnackDto })
  async create(@Body() createSnackDto: CreateSnackDto) {
    return await this.snacksService.create(createSnackDto);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Get all the snacks' })
  async findAll(@Query() query: SnackPagination) {
    return await this.snacksService.findAll(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'Get a specific snack by id' })
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
  @ApiCreatedResponse({ description: 'Delete a specific snack by id' })
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
