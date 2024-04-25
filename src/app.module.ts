import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [
    CacheModule.register({ isGlobal: true, store: redisStore, host: 'localhost', port: 6379}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test@test',
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


