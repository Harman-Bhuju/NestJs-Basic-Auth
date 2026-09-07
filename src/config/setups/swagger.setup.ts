import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { PaginationMetaDto } from 'src/common/dto/pagination-meta.dto';
import { ConfigService } from '@nestjs/config';
import basicAuth from 'express-basic-auth';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);

  const swaggerUsername = configService.get<string>('SWAGGER_USERNAME');
  const swaggerPassword = configService.get<string>('SWAGGER_PASSWORD');

  if (!swaggerUsername || !swaggerPassword) {
    throw new Error('SWAGGER_USERNAME and SWAGGER_PASSWORD must be configured');
  }

  const config = new DocumentBuilder()
    .setTitle('NestJS Basic Auth')
    .setDescription('Basic nestjs auth flow')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter  your JWT access token here',
      },
      'access-token',
    )
    .setExternalDoc('Postman Collection', '/apis-json')
    .build();

  // extraModels registers schemas that are only ever referenced via a raw
  // $ref (e.g. errorExample()'s allOf/$ref pattern in ErrorResponseDto)
  // rather than through a decorator's `type:` option — without this,
  // '#/components/schemas/ErrorResponseDto' would point at nothing.
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    extraModels: [ErrorResponseDto, PaginationMetaDto],
  });

  const httpAdapter = app.getHttpAdapter().getInstance();

  const swaggerAuth = basicAuth({
    challenge: true,
    users: {
      [swaggerUsername]: swaggerPassword,
    },
  });

  // Protect Swagger UI
  httpAdapter.use('/api/docs', swaggerAuth);

  // Protect OpenAPI JSON
  httpAdapter.use('/apis-json', swaggerAuth);

  httpAdapter.get('/apis-json', (_, res) => {
    res.json(document);
  });

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      // Remembers your login/access token when you refresh the page
    },
  });
}
