import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //validation
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ));

  //swagger
  const config = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('The API description :D')
    .setVersion('0.1')
    .addTag('App') // This matches the ApiTags('App') in your controller
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //cors
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONT_URL'), 
  });
  await app.listen(3000);
}
bootstrap();
