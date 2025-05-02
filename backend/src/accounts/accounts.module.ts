import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { RoleFunctionsModule } from '../role_functions/role-functions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    RoleFunctionsModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService], // Export service for auth purposes
})
export class AccountsModule {} 