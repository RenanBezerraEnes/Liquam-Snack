import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomBadRequest } from 'exceptions/custom-bad-request-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomBadRequest());
  const options = new DocumentBuilder()
    .setTitle('Liquam Snack API')
    .setDescription('Liquam Snack API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
