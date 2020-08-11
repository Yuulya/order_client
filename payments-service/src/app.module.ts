import { Module } from '@nestjs/common';
import { PaymentsModule } from './modules/payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from './common/config';

const MONGO_DB_URI: string = getConfig().get('mongodb.uri');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: MONGO_DB_URI,
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      },
    }),
    PaymentsModule
  ],
})
export class AppModule {}
