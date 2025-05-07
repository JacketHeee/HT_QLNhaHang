import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('accounts')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Roles('taikhoan')
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @Roles('taikhoan')
  findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @Roles('taikhoan')
  findOne(@Param('id') id: string): Promise<Account> {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('taikhoan')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<Account> {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @Roles('taikhoan')
  remove(@Param('id') id: string): Promise<void> {
    return this.accountsService.remove(+id);
  }

  @Put('lock/:id')
  @Roles('taikhoan')
  lock(@Param('id') id: number): Promise<void> {
    return this.accountsService.lock(+id);
  }

  @Put('unlock/:id')
  @Roles('taikhoan')
  unLock(@Param('id') id: number): Promise<void> {
    return this.accountsService.unLock(+id);
  }
}
