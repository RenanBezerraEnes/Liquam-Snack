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
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
  @ApiResponse({
    status: 400,
    description: 'The fields are required, check the Schema',
    type: CreateSnackDto,
  })
  @ApiBody({ type: CreateSnackDto })
  create(@Body() createSnackDto: CreateSnackDto) {
    return this.snacksService.create(createSnackDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all the snacks' })
  @ApiQuery({ type: Number, name: 'size' })
  @ApiQuery({ type: Number, name: 'page' })
  @ApiQuery({ type: Number, name: 'minPrice' })
  @ApiQuery({ type: Number, name: 'maxPrice' })
  @ApiQuery({ type: String, name: 'order' })
  @ApiResponse({
    status: 200,
    description: `In this endpoint, it is possible to get all the snacks. </br> You can use the order as a query to check the price, description, etc... </br> I also added pagination. You can add page and size in the query`,
  })
  findAll(
    @Query('size') size,
    @Query('page') page,
    @Query('minPrice') minPrice,
    @Query('maxPrice') maxPrice,
    @Query('order') order,
  ) {
    const query: SnackPagination = { size, page, minPrice, maxPrice, order };
    return this.snacksService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a specific snack by id' })
  @ApiResponse({
    status: 200,
    description: 'In this endpoint, you can get a snack by a specific id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Id not found',
  })
  findOne(
    @Param('id')
    id: string,
  ) {
    console.log(id);
    return this.snacksService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a specific snack by id' })
  @ApiResponse({
    status: 204,
    description: 'In this endpoint, you can delete a snack by a specific id.',
  })
  @ApiResponse({
    status: 404,
    description: 'Id not found',
  })
  delete(
    @Param('id')
    id: string,
  ) {
    return this.snacksService.remove(id);
  }
}
