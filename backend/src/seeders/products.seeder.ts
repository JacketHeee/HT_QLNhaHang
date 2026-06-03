import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed(): Promise<any> {
    const categories = await this.categoryRepository.find();
    
    const getCategoryId = (name: string): number => {
      const category = categories.find(c => c.tenLoaiMonAn.toLowerCase() === name.toLowerCase());
      if (!category) {
        console.error(`LỖI SEEDER: Không tìm thấy loại món ăn "${name}" trong bảng Category!`);
        return 0;
      }
      return category.ID;
    };

    // Lấy ID thực tế từ database dựa theo tên nhóm danh mục em đã chèn trước đó
    const idHamburger = getCategoryId('Hamburger');
    const idCoffee = getCategoryId('Coffee');
    const idGaRan = getCategoryId('Gà rán');
    const idNuocUong = getCategoryId('Nước uống');
    const idTrangMieng = getCategoryId('Tráng miệng');

    // 2. Chuyển đổi đống dữ liệu SQL INSERT của em thành mảng Object cho TypeORM
    const productsData = [
      // === HAMBURGER (IDLoaiMonAn: 1) ===
      { tenMonAn: 'Burger Bò Phô Mai Đặc Biệt', moTa: 'Burger bò và phô mai', giaBan: 56000, tenHinhAnh: 'cheesedlx_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Bò Hoàng Gia Đặc Biệt', moTa: 'Burger bò và phô mai cỡ lớn', giaBan: 89000, tenHinhAnh: 'mcroyaldlx_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Xúc Xích', moTa: 'Burger kèm xúc xích miếng', giaBan: 36000, tenHinhAnh: 'sausagebg_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Gà Nhỏ Mayo', moTa: 'Burger gà chiên, xốt mayo', giaBan: 36000, tenHinhAnh: 'xchickbg.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Hai Lớp Bò, Phô Mai', moTa: 'Burger kèm 2 miếng bò và phô mai', giaBan: 66000, tenHinhAnh: 'xdoublecheese_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Phi Lê, Cá Phô Mai', moTa: 'Burger kèm cá phi lê chiên', giaBan: 56000, tenHinhAnh: 'xfof_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Gà Phô Mai Đặc Biệt', moTa: 'Burger phô mai cỡ lớn', giaBan: 69000, tenHinhAnh: 'xmcchickendlx_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Thịt Nhỏ', moTa: 'Burger kèm thịt cỡ nhỏ', giaBan: 79000, tenHinhAnh: 'xmcroyal_bb.png', IDLoaiMonAn: idHamburger, isDeleted: false },
      { tenMonAn: 'Burger Gà Thượng Hạng Giòn Cay', moTa: 'Burger kèm gà chiên, cay, cỡ lớn', giaBan: 89000, tenHinhAnh: 'xMcSpicy_281_29.png', IDLoaiMonAn: idHamburger, isDeleted: false },

      // === COFFEE & ĐÁ XAY & SỮA CHUA (IDLoaiMonAn: 2) ===
      { tenMonAn: 'Cafe Sữa Đá Việt Nam', moTa: 'Cafe sữa pha đá', giaBan: 35000, tenHinhAnh: 'iced_milkVNcoffee.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Cafe Đen Đá Việt Nam', moTa: 'Cafe đen pha đá', giaBan: 35000, tenHinhAnh: 'iced_VNcoffee.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Americano Đá', moTa: 'Cafe Americano pha đá', giaBan: 45000, tenHinhAnh: 'icedamericano.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Cafe Latte Đá', moTa: 'Cafe latte pha đá', giaBan: 55000, tenHinhAnh: 'icedlatte.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Matcha Latte Đá', moTa: 'Matcha latte pha đá', giaBan: 69000, tenHinhAnh: 'xicedmatcha.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Caramel Đá Xay', moTa: 'Đá xay và caramel', giaBan: 69000, tenHinhAnh: 'caramelfrappe.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Choco Đá Xay', moTa: 'Đá xay và sô cô la', giaBan: 69000, tenHinhAnh: 'chocofrappe.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Latte Đá Xay', moTa: 'Đá xay và kem latte', giaBan: 69000, tenHinhAnh: 'lattefrappe.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Mocha Đá Xay', moTa: 'Thức uống mocha và đá xay', giaBan: 69000, tenHinhAnh: 'mochafrappe.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Trà Xanh Đá Xay', moTa: 'Trà xanh và đá xay', giaBan: 79000, tenHinhAnh: 'xfrappematcha.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Americano Nóng', moTa: 'Cafe Americano pha nóng', giaBan: 39000, tenHinhAnh: 'americano.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Capuchino Nóng', moTa: 'Cafe Capuchino pha nóng', giaBan: 49000, tenHinhAnh: 'cappucino.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Sô Cô La Nóng', moTa: 'Sô cô la pha nóng', giaBan: 49000, tenHinhAnh: 'hotchoco.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Latte Nóng', moTa: 'Cafe Latte pha nóng', giaBan: 49000, tenHinhAnh: 'hotlatte.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Cafe Mocha', moTa: 'Thức uống cafe mocha', giaBan: 59000, tenHinhAnh: 'mocha.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Matcha Latte Nóng', moTa: 'Matcha latte pha nóng', giaBan: 60000, tenHinhAnh: 'xhotmatcha.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Sữa Chua Dứa Vàng', moTa: 'Sữa chua pha nước ép dứa vàng', giaBan: 59000, tenHinhAnh: 'xY-1.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Sữa Chua Dâu', moTa: 'Sữa chua pha nước ép dâu', giaBan: 59000, tenHinhAnh: 'xyogurt-dau.png', IDLoaiMonAn: idCoffee, isDeleted: false },
      { tenMonAn: 'Sữa Chua Kiwi', moTa: 'Sữa chua pha nước ép kiwi', giaBan: 59000, tenHinhAnh: 'xyogurt-kiwi.png', IDLoaiMonAn: idCoffee, isDeleted: false },

      // === GÀ RÁN (IDLoaiMonAn: 3) ===
      { tenMonAn: '1 Miếng Gà Rán', moTa: '1 miếng gà chiên bột', giaBan: 37000, tenHinhAnh: 'x1-ga-ran.png', IDLoaiMonAn: idGaRan, isDeleted: false },
      { tenMonAn: '3 Miếng Gà Rán', moTa: '3 miếng gà chiên bột', giaBan: 10300, tenHinhAnh: 'x3-ga-ran.png', IDLoaiMonAn: idGaRan, isDeleted: false },
      { tenMonAn: '3 Cánh Gà Rán McWings', moTa: '3 cánh gà chiên bột', giaBan: 69000, tenHinhAnh: 'x3pcs_chicken_mcwings.png', IDLoaiMonAn: idGaRan, isDeleted: false },
      { tenMonAn: '5 Miếng Gà Rán', moTa: '5 miếng gà chiên bột', giaBan: 176000, tenHinhAnh: 'x5-ga-ran.png', IDLoaiMonAn: idGaRan, isDeleted: false },
      { tenMonAn: '6 Cánh Gà Rán McWings', moTa: '6 cánh gà chiên bột', giaBan: 125000, tenHinhAnh: 'x6-wings.png', IDLoaiMonAn: idGaRan, isDeleted: false },
      { tenMonAn: '10 Cánh Gà Rán McWings', moTa: '10 cánh gà chiên bột', giaBan: 179000, tenHinhAnh: 'x10-wings.png', IDLoaiMonAn: idGaRan, isDeleted: false },

      // === NƯỚC UỐNG (IDLoaiMonAn: 4) ===
      { tenMonAn: 'Nước Suối', moTa: 'Nước suối từ thiên nhiên', giaBan: 22000, tenHinhAnh: 'xdasani_water.png', IDLoaiMonAn: idNuocUong, isDeleted: false },
      { tenMonAn: 'Fanta', moTa: 'Nước ngọt Fanta', giaBan: 17000, tenHinhAnh: 'xhero-pdt-Fanta-201703_0.png', IDLoaiMonAn: idNuocUong, isDeleted: false },
      { tenMonAn: 'Cocacola', moTa: 'Nước ngọt Cocacola', giaBan: 17000, tenHinhAnh: 'xmcd-food-beverages-soft-drinks-coke.png', IDLoaiMonAn: idNuocUong, isDeleted: false },
      { tenMonAn: 'Sữa Tươi', moTa: 'Sữa tươi từ thiên nhiên', giaBan: 22000, tenHinhAnh: 'xmilk_300x300.png', IDLoaiMonAn: idNuocUong, isDeleted: false },
      { tenMonAn: 'Milo', moTa: 'Sữa Milo', giaBan: 22000, tenHinhAnh: 'xmilo.png', IDLoaiMonAn: idNuocUong, isDeleted: false },
      { tenMonAn: 'Sprite', moTa: 'Nước ngọt Sprite', giaBan: 17000, tenHinhAnh: 'xProduct_thumb_Sprite.png', IDLoaiMonAn: idNuocUong, isDeleted: false },

      // === TRÁNG MIỆNG (IDLoaiMonAn: 5) ===
      { tenMonAn: 'Bánh Phô Mai Nướng', moTa: 'Bánh nướng kèm phô mai', giaBan: 35000, tenHinhAnh: 'xBAKED-CHEESECAKE.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Bánh Nướng Vị Chuối', moTa: 'Bánh chuối nướng', giaBan: 30000, tenHinhAnh: 'xBANANA-MUFFIN.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Bánh Brownie Sô Cô La', moTa: 'Burger mềm sô cô la', giaBan: 30000, tenHinhAnh: 'xCHOCO-BROWNIE.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Bánh Quy Sô Cô La', moTa: 'Bánh quy sô cô la', giaBan: 25000, tenHinhAnh: 'xCHOCOLATE-CHIP-COOKIE.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Bánh Macaron Dừa', moTa: 'Bánh macaron vị dừa', giaBan: 15000, tenHinhAnh: 'xCOCONUT-MACAROON.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Bánh Sừng Trâu', moTa: 'Bánh sừng trâu nhỏ', giaBan: 30000, tenHinhAnh: 'xcroissant.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Kem McSundea Xốt Sô Cô La', moTa: 'Kem tươi sốt sô cô la', giaBan: 29000, tenHinhAnh: 'xhotfudge_mcsundae.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Kem Ốc Quế', moTa: 'Kem tươi ốc quế', giaBan: 10000, tenHinhAnh: 'xmcdonalds_cone.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Kem Xay Bánh Oreo Trà Xanh', moTa: 'Kem tươi xay bánh oreo hương vị trà xanh', giaBan: 39000, tenHinhAnh: 'xmcfmc.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Kem Xay Bánh Oreo', moTa: 'Kem tươi xay bánh oreo', giaBan: 39000, tenHinhAnh: 'xoreo_mcflurry.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
      { tenMonAn: 'Kem McSundea Xốt Dâu', moTa: 'Kem tươi sốt dâu', giaBan: 29000, tenHinhAnh: 'xstrawberry-mcsundae.png', IDLoaiMonAn: idTrangMieng, isDeleted: false },
    ];

    // 3. Thực hiện lưu mảng dữ liệu món ăn vào DB
    return this.productRepository.save(productsData);
  }

  async drop(): Promise<any> {
    // Xóa toàn bộ dữ liệu bảng sản phẩm khi reset seeder
    return this.productRepository.delete({});
  }
}