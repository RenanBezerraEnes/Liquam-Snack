import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { CreateSnackDto } from './dto/create-snack.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { SnackPagination } from './dto/pagination-snack.dto';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snacksService: SnacksService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Post new snacks' })
  @ApiBody({ type: CreateSnackDto })
  create(@Body() createSnackDto: CreateSnackDto) {
    return this.snacksService.create(createSnackDto);
  }

  @Get()
  @ApiCreatedResponse({ description: 'Get all the snacks' })
  findAll(@Query() query: SnackPagination) {
    return this.snacksService.findAll(query);
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'Get a specific snack by id' })
  findById(
    @Param('id')
    id: string,
  ) {
    return this.snacksService.findOne(id);
  }

  @Delete(':id')
  @ApiCreatedResponse({ description: 'Delete a specific snack by id' })
  delete(
    @Param('id')
    id: string,
  ) {
    return this.snacksService.remove(id);
  }
}
