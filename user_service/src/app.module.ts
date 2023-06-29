import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'userdatabase',
          port: 5432,
          username: 'abhay',
          password: 'user@123',
          database: 'microuserdb',
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
