import { Module } from '@nestjs/common';
import { SnacksService } from './snacks.service';
import { SnacksController } from './snacks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Snack, SnackSchema } from './entities/snack.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snack.name, schema: SnackSchema }]),
  ],
  controllers: [SnacksController],
  providers: [SnacksService],
})
export class SnacksModule {}
