import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // ---- Swagger setup starts here ----
  const config = new DocumentBuilder()
    .setTitle('Booking Platform API')
    .setDescription('REST API for managing services and customer bookings')
    .setVersion('1.0')
    .addBearerAuth() // adds the "Authorize" button so we can paste a JWT token in the UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // docs page will live at /api
  // ---- Swagger setup ends here ----

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();