"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async onModuleInit() {
        const count = await this.productsRepository.count();
        if (count === 0) {
            const sampleProducts = [
                {
                    name: 'Hamburger',
                    description: 'Burger with beef patty, lettuce, tomato, and cheese',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/hamburger.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 122.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 122.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
                {
                    name: 'Grilled squid satay',
                    description: 'Grilled squid with satay sauce',
                    price: 123.00,
                    imageUrl: 'https://example.com/images/grilled-squid-satay.jpg',
                    category: 'Sea food',
                },
            ];
            await this.productsRepository.save(sampleProducts);
        }
    }
    async findAll() {
        return this.productsRepository.find();
    }
    async findOne(id) {
        const product = await this.productsRepository.findOneBy({ id });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    async create(newProduct) {
        const product = this.productsRepository.create(newProduct);
        return this.productsRepository.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map