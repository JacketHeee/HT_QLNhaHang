import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { FeaturesGuard } from './guards/features.guard';
import { Role } from '../roles/entities/role.entity';
import { Feature } from '../features/entities/feature.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
  imports: [
    AccountsModule,
    PassportModule,
    TypeOrmModule.forFeature([Role, Feature]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'hard!to-guess_secret',
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  // providers: [AuthService, LocalStrategy, JwtStrategy, FeaturesGuard],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  // exports: [AuthService, FeaturesGuard],
  exports: [AuthService],
})
export class AuthModule {} 