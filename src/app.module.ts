import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import {
  OrdersModule,
  OrdersController,
  OrdersService,
} from './modules/orders/index.js';
import {
  ProductsModule,
  ProductsController,
  ProductsService,
} from './modules/products/index.js';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule to use the ConfigService
      inject: [ConfigService], // Inject the ConfigService to use the configuration
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true, // Automatically load all entities in the src/entities directory (src/entities/*.ts)
        synchronize: true, // TODO: remove in production
      }),
    }),

    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController, OrdersController, ProductsController],
  providers: [AppService, OrdersService, ProductsService],
})
export class AppModule { }
