import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'NostraAcademy',
      entities: ['**/entity/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: "test-secret-key",
      signOptions: { expiresIn: '60s' },
    })
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


