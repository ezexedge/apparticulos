import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'clasificados',
      autoLoadEntities: true,
     synchronize: true
    }),
    AuthModule,
    ProductoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
