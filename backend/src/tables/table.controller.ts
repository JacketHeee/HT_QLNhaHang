import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  } 

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.tableService.delete(+id);
  }
}
