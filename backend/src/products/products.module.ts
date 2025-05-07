import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { PermissionsModule } from 'src/guards/permission.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]),
        PermissionsModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}