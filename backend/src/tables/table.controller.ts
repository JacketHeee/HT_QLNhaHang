import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('table')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  @Roles('banan', 'donhang')
  findAll() {
    return this.tableService.findAll();
  }

  @Get('/:id')
  @Roles('banan', 'donhang')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Post()
  @Roles('banan', 'donhang')
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Patch('/:id')
  @Roles('banan', 'donhang')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  } 

  @Delete('/:id')
  @Roles('banan', 'donhang')
  delete(@Param('id') id: string) {
    return this.tableService.delete(+id);
  }
}
