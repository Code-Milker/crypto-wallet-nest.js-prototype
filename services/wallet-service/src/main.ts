import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'wallet-consumer', // Unique per service
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3003); // Adjust port for the service
}
bootstrap();
