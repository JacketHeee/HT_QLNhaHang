"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const customers_module_1 = require("./customers/customers.module");
const employees_module_1 = require("./employees/employees.module");
const product_entity_1 = require("./products/entities/product.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const order_item_entity_1 = require("./orders/entities/order-item.entity");
const customer_entity_1 = require("./customers/entities/customer.entity");
const employee_entity_1 = require("./employees/entities/employee.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'pos.sqlite',
                entities: [product_entity_1.Product, order_entity_1.Order, order_item_entity_1.OrderItem, customer_entity_1.Customer, employee_entity_1.Employee],
                synchronize: true,
            }),
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            customers_module_1.CustomersModule,
            employees_module_1.EmployeesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map