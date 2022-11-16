import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnacksModule } from './snacks/snacks.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SnacksModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // I removed the .env, otherwise you wouldn't have access to the db.
    MongooseModule.forRoot(
      'mongodb+srv://RenanBezerra:ZmRh3d0clWzfOP9X@liquam-snack.kcscket.mongodb.net/liquam-snack?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
