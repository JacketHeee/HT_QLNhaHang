// src/seeder.ts
import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RolesSeeder } from './roles.seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Account } from 'src/accounts/entities/account.entity';
import { Feature } from 'src/features/entities/feature.entity';
import { FeatureRole } from 'src/feature-roles/entities/feature-role.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Order_Product } from 'src/orders_products/entities/order_product.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Category } from 'src/categories/entities/category.entity';
import { SideDish } from 'src/sidedishes/entities/sidedish.entity';
import { SideDish_Product } from 'src/products_sidedishes/entities/product_sidedishes.entity';
import { Table } from 'src/tables/entities/table.entity';
import { FeaturesSeeder } from './features.seeder';
import { FeatureRolesSeeder } from './feature_roles.seeder';
import { EmployeesSeeder } from './employee.seeder';
import { AccountsSeeder } from './account.seeder';
import { CategoriesSeeder } from './categories.seeder';
import { ProductsSeeder } from './products.seeder';
import { SideDishesSeeder } from './sidedishes.seeder';
import { SideDishProductsSeeder } from './productsidedishes.seeder';
import { TablesSeeder } from './table.seeder';
seeder({
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
                synchronize: true, // Chỉ bật khi dev/vừa tạo bảng em nhé
            }),
        }),
        TypeOrmModule.forFeature([Role, Feature, FeatureRole, Employee, Account, Category, Product, SideDish, SideDish_Product, Table]),
    ],
}).run([RolesSeeder, FeaturesSeeder, FeatureRolesSeeder, EmployeesSeeder, AccountsSeeder, CategoriesSeeder, ProductsSeeder, SideDishesSeeder, SideDishProductsSeeder, TablesSeeder]);