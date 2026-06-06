import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Product } from 'src/products/entities/product.entity';
import { SideDish } from 'src/sidedishes/entities/sidedish.entity';
import { SideDish_Product } from 'src/products_sidedishes/entities/product_sidedishes.entity';

@Injectable()
export class SideDishProductsSeeder implements Seeder {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(SideDish)
        private readonly sideDishRepository: Repository<SideDish>,

        @InjectRepository(SideDish_Product)
        private readonly sideDishProductRepository: Repository<SideDish_Product>,
    ) { }

    async seed(): Promise<any> {
        const mappingData = [
            {
                tenMonAnKem: 'Bắp cải trộn',
                monChinhs: [
                    'Burger Bò Phô Mai Đặc Biệt', 'Burger Bò Hoàng Gia Đặc Biệt', 'Burger Xúc Xích',
                    'Burger Gà Nhỏ Mayo', 'Burger Hai Lớp Bò, Phô Mai', 'Burger Phi Lê, Cá Phô Mai',
                    'Burger Gà Phô Mai Đặc Biệt', 'Burger Thịt Nhỏ', 'Burger Gà Thượng Hạng Giòn Cay',
                    '1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán',
                    '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings'
                ]
            },
            {
                tenMonAnKem: 'Bắp xào bơ',
                monChinhs: [
                    'Burger Bò Phô Mai Đặc Biệt', 'Burger Bò Hoàng Gia Đặc Biệt', 'Burger Xúc Xích',
                    'Burger Gà Nhỏ Mayo', 'Burger Hai Lớp Bò, Phô Mai', 'Burger Phi Lê, Cá Phô Mai',
                    'Burger Gà Phô Mai Đặc Biệt', 'Burger Thịt Nhỏ', 'Burger Gà Thượng Hạng Giòn Cay',
                    '1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán',
                    '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings'
                ]
            },
            {
                tenMonAnKem: 'Bánh mì bơ tỏi',
                monChinhs: ['1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán', '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings']
            },
            {
                tenMonAnKem: 'Cơm',
                monChinhs: ['1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán', '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings']
            },
            {
                tenMonAnKem: 'Salad Mayo',
                monChinhs: [
                    'Burger Bò Phô Mai Đặc Biệt', 'Burger Bò Hoàng Gia Đặc Biệt', 'Burger Xúc Xích',
                    'Burger Gà Nhỏ Mayo', 'Burger Hai Lớp Bò, Phô Mai', 'Burger Phi Lê, Cá Phô Mai',
                    'Burger Gà Phô Mai Đặc Biệt', 'Burger Thịt Nhỏ', 'Burger Gà Thượng Hạng Giòn Cay',
                    '1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán',
                    '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings'
                ]
            },
            {
                tenMonAnKem: 'Salad sống',
                monChinhs: [
                    'Burger Bò Phô Mai Đặc Biệt', 'Burger Bò Hoàng Gia Đặc Biệt', 'Burger Xúc Xích',
                    'Burger Gà Nhỏ Mayo', 'Burger Hai Lớp Bò, Phô Mai', 'Burger Phi Lê, Cá Phô Mai',
                    'Burger Gà Phô Mai Đặc Biệt', 'Burger Thịt Nhỏ', 'Burger Gà Thượng Hạng Giòn Cay',
                    '1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán',
                    '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings'
                ]
            },
            {
                tenMonAnKem: 'Sốt chấm phô mai',
                monChinhs: ['1 Miếng Gà Rán', '3 Miếng Gà Rán', '3 Cánh Gà Rán McWings', '5 Miếng Gà Rán', '6 Cánh Gà Rán McWings', '10 Cánh Gà Rán McWings']
            },
            {
                tenMonAnKem: 'Trân châu trắng',
                monChinhs: [
                    'Cafe Sữa Đá Việt Nam', 'Cafe Đen Đá Việt Nam', 'Americano Đá', 'Cafe Latte Đá', 'Matcha Latte Đá',
                    'Caramel Đá Xay', 'Choco Đá Xay', 'Latte Đá Xay', 'Mocha Đá Xay', 'Trà Xanh Đá Xay',
                    'Sữa Chua Dứa Vàng', 'Sữa Chua Dâu', 'Sữa Chua Kiwi'
                ]
            },
            {
                tenMonAnKem: 'Trân châu đen',
                monChinhs: [
                    'Cafe Sữa Đá Việt Nam', 'Cafe Đen Đá Việt Nam', 'Americano Đá', 'Cafe Latte Đá', 'Matcha Latte Đá',
                    'Caramel Đá Xay', 'Choco Đá Xay', 'Latte Đá Xay', 'Mocha Đá Xay', 'Trà Xanh Đá Xay',
                    'Sữa Chua Dứa Vàng', 'Sữa Chua Dâu', 'Sữa Chua Kiwi'
                ]
            },
            {
                tenMonAnKem: 'Thạch dừa',
                monChinhs: [
                    'Cafe Sữa Đá Việt Nam', 'Cafe Đen Đá Việt Nam', 'Americano Đá', 'Cafe Latte Đá', 'Matcha Latte Đá',
                    'Caramel Đá Xay', 'Choco Đá Xay', 'Latte Đá Xay', 'Mocha Đá Xay', 'Trà Xanh Đá Xay',
                    'Sữa Chua Dứa Vàng', 'Sữa Chua Dâu', 'Sữa Chua Kiwi'
                ]
            },
            {
                tenMonAnKem: 'Thạch cafe',
                monChinhs: [
                    'Cafe Sữa Đá Việt Nam', 'Cafe Đen Đá Việt Nam', 'Americano Đá', 'Cafe Latte Đá', 'Matcha Latte Đá',
                    'Caramel Đá Xay', 'Choco Đá Xay', 'Latte Đá Xay', 'Mocha Đá Xay', 'Trà Xanh Đá Xay',
                    'Americano Nóng', 'Capuchino Nóng', 'Sô Cô La Nóng', 'Latte Nóng', 'Cafe Mocha', 'Matcha Latte Nóng',
                    'Sữa Chua Dứa Vàng', 'Sữa Chua Dâu', 'Sữa Chua Kiwi'
                ]
            }
        ];

        const allSideDishes = await this.sideDishRepository.find();
        const allProducts = await this.productRepository.find();
        interface psdData {
            IDMonAn: number,
            IDMonAnKem: number,
            isDeleted: boolean
        }
        const sideDishProductsData: psdData[] = [];

        for (const item of mappingData) {
            const sideDish = allSideDishes.find(s => s.tenMonAnKem.toLowerCase() === item.tenMonAnKem.toLowerCase());

            if (!sideDish) {
                console.warn(`⚠️ Không tìm thấy món ăn kèm: "${item.tenMonAnKem}" ở database.`);
                continue;
            }

            for (const tenMonChinh of item.monChinhs) {
                const product = allProducts.find(p => p.tenMonAn.toLowerCase() === tenMonChinh.toLowerCase());

                if (!product) {
                    console.warn(`⚠️ Không tìm thấy món chính: "${tenMonChinh}" ứng với món kèm "${item.tenMonAnKem}".`);
                    continue;
                }

                // Đẩy vào mảng lưu trữ cuối cùng
                sideDishProductsData.push({
                    IDMonAn: product.ID,
                    IDMonAnKem: sideDish.ID,
                    isDeleted: false
                });
            }
        }

        if (sideDishProductsData.length > 0) {
            return this.sideDishProductRepository.save(sideDishProductsData);
        }
    }

    async drop(): Promise<any> {
        return this.sideDishProductRepository.delete({});
    }
}