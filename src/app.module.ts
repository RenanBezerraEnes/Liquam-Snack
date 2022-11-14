import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnacksModule } from './snacks/snacks.module';

@Module({
  imports: [SnacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
