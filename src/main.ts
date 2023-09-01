import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiResponseInterceptor } from '../shared/ApiResponseInterceptor';
import { AllExceptionsFilter } from '../shared/AllExceptionsFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express'; // Import express

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Zamkey Ecommerze API')
    .setDescription('Basic Backend API for Zamkey Ecommerze')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-Auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  // Serve static Swagger UI files
  app.use('/swagger-ui', express.static('public/swagger-ui'));

  await app.listen(process.env.PORT);
}
bootstrap();
