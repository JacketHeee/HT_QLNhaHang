import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './categories/category.module';
import { Category } from './categories/entities/category.entity';
import { Employee } from './employees/entities/employee.entity';
import { Customer } from './customers/entities/customer.entity';
import { Order_Product } from './orders_products/entities/order_product.entity';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { SideDish } from './sidedishes/entities/sidedish.entity';
import { SideDishModule } from './sidedishes/sidedish.module';
import { SideDish_Product } from './products_sidedishes/entities/product_sidedishes.entity';
import { SideDish_ProductModule } from './products_sidedishes/product_sidedishes.module';
import { TableModule } from './tables/table.module';
import { Table } from './tables/entities/table.entity';
import { OrdersProductsModule } from './orders_products/orders_products.module';
import { AccountsModule } from './accounts/accounts.module';
import { RolesModule } from './roles/roles.module';
import { FunctionsModule } from './functions/functions.module';
import { RoleFunctionsModule } from './role_functions/role-functions.module';
import { Account } from './accounts/entities/account.entity';
import { Role } from './roles/entities/role.entity';
import { Function } from './functions/entities/function.entity';
import { RoleFunction } from './role_functions/entities/role_function.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Sử dụng TypeORM với cấu hình từ .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DATABASE_TYPE') || 'postgres';
        
        if (dbType === 'sqlite') {
          // Cấu hình cho SQLite
          return {
            type: 'sqlite',
            database: configService.get<string>('DATABASE_FILE') || 'pos.sqlite',
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
          };
        } else {
          // Cấu hình cho PostgreSQL
          return {
            type: 'postgres',
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT') || 5432,
            username: configService.get<string>('DATABASE_USER'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true,
            ssl: configService.get<boolean>('DATABASE_SSL') 
              ? {
                  rejectUnauthorized: false,
                }
              : false,
            logging: true,
          };
        }
      },
      inject: [ConfigService],
    }),

    // Chạy db local
    // TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: '123456',
    //     database: 'quanlynhahanglocal',
    //     entities: [Product, Order, Order_Product, Customer, Employee, Category, SideDish, SideDish_Product, Table, Account, Role, Function, RoleFunction],
    //     synchronize: true,
    // }),

    ProductsModule,
    OrdersModule,
    CustomersModule,
    EmployeesModule,
    CategoryModule,
    SideDishModule,
    SideDish_ProductModule,
    TableModule,
    OrdersProductsModule,
    AccountsModule,
    RolesModule,
    FunctionsModule,
    RoleFunctionsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}