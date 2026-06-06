import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { CategoryModule } from './categories/category.module';
import { Category } from './categories/entities/category.entity';
import { OrdersProductsModule } from './orders_products/orders_products.module';
import { Order_Product } from './orders_products/entities/order_product.entity';
import { SideDish } from './sidedishes/entities/sidedish.entity';
import { SideDishModule } from './sidedishes/sidedish.module';
import { SideDish_Product } from './products_sidedishes/entities/product_sidedishes.entity';
import { SideDish_ProductModule } from './products_sidedishes/product_sidedishes.module';
import { TableModule } from './tables/table.module';
import { Table } from './tables/entities/table.entity';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { AuthModule } from './auth/auth.module';
import { FeaturesModule } from './features/features.module';
import { Feature } from './features/entities/feature.entity';
import { FeatureRolesModule } from './feature-roles/feature-roles.module';
import { FeatureRole } from './feature-roles/entities/feature-role.entity';
import { PermissionsModule } from './guards/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Product,
          Order,
          Order_Product,
          Employee,
          Category,
          SideDish,
          SideDish_Product,
          Table,
          Account,
          Role,
          Feature,
          FeatureRole
        ],
        synchronize: true,
      }),
    }),
    ProductsModule,
    OrdersModule,
    EmployeesModule,
    CategoryModule,
    SideDishModule,
    SideDish_ProductModule,
    TableModule,
    OrdersProductsModule,
    AccountsModule,
    RolesModule,
    AuthModule,
    FeaturesModule,
    FeatureRolesModule,
    PermissionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }