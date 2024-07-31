import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import configurations from './configurations';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/user.model';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { Token } from './modules/auth/token.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:['development.env'],
      load:[configurations]
    }), 
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => ({
        dialect:"postgres",
        host:configService.get("DB_HOST"),
        port:configService.get("DB_PORT"),
        username:configService.get("DB_USER"),
        password:configService.get("DB_PASSWORD"),
        database:configService.get("DB_NAME"),
        synchronize:true,
        autoLoadModels: true,
        models:[
          User,
          Token
        ]
      })}),
    PassportModule,
    UserModule,
    AuthModule],
  providers: [JwtStrategy],
})
export class AppModule {}
