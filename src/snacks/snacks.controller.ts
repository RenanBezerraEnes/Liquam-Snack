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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SnackPagination } from './dto/pagination-snack.dto';

@Controller('snacks')
export class SnacksController {
  constructor(private readonly snacksService: SnacksService) {}

  @Post()
  @ApiOperation({ summary: 'Post a new snack' })
  @ApiResponse({
    status: 201,
    description: 'In this endpoint, it is possible to post new snacks.',
    type: CreateSnackDto,
  })
  @ApiBody({ type: CreateSnackDto })
  create(@Body() createSnackDto: CreateSnackDto) {
    return this.snacksService.create(createSnackDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all the snacks' })
  @ApiResponse({
    status: 200,
    description:
      'In this endpoint, it is possible to get all the snacks with prices from 150 to 300. I also added pagination. You can add page and size in the query.',
  })
  findAll(@Query() query: SnackPagination) {
    return this.snacksService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a specific snack by id' })
  @ApiResponse({
    status: 200,
    description: 'In this endpoint, you can get a snack by a specific id.',
  })
  findById(
    @Param('id')
    id: string,
  ) {
    return this.snacksService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a specific snack by id' })
  @ApiResponse({
    status: 204,
    description: 'In this endpoint, you can delete a snack by a specific id.',
  })
  delete(
    @Param('id')
    id: string,
  ) {
    return this.snacksService.remove(id);
  }
}
