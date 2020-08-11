import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getConfig } from './common/config';

const MONGO_DB_URI: string = getConfig().get('mongodb.uri');
console.log(MONGO_DB_URI)

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
    OrdersModule
  ],
})
export class AppModule {}
