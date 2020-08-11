import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { INestApplication, Logger } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { getConfig, getHost, getPort } from './common/config';

console.log(getPort())

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true, bodyParser: true});
  app.setGlobalPrefix(getConfig().get('service.baseUrl'));
  app.enableCors();

  initSwagger(app);
  await app.listen(getPort());
}

export function initSwagger(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle('Order Service API')
    .setDescription('Swagger specification for Order Service API')
    .setVersion('0.0.0')
    .addSecurity('bearer', {
      type: 'apiKey',
      name: 'access_token',
      in: 'header',
    });

  const swaggerOpts = builder.build();
  const document = SwaggerModule.createDocument(app, swaggerOpts);
  writeFileSync(`./swagger.json`, JSON.stringify(document, null, 2), {encoding: 'utf8'});
  SwaggerModule.setup('doc/orders', app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
    customSiteTitle: 'Order Service API',
  });
}

bootstrap().then(() => {
  Logger.log(`Server started at http://${getHost()}:${getPort()}`);
  Logger.log(`Swagger started at http://${getHost()}:${getPort()}/doc/orders`)
  //console.log()
}).catch(e => {
  console.log(e)
});

