import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiResponseInterceptor } from './shared/ApiResponseInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
