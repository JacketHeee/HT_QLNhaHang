import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Role } from '../roles/entities/role.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Employee, Role]),
    PermissionsModule
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService], // Export để các module khác có thể sử dụng service này
})
export class AccountsModule {}
