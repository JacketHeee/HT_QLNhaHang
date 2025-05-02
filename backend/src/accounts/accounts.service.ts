import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employees/entities/employee.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({
      relations: ['employee', 'role'],
    });
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['employee', 'role'],
    });
    
    if (!account) {
      throw new NotFoundException(`Tài khoản với ID ${id} không tồn tại`);
    }
    
    return account;
  }

  async findByUsername(username: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { username },
      relations: ['employee', 'role'],
    });
    
    if (!account) {
      throw new NotFoundException(`Tài khoản với username ${username} không tồn tại`);
    }
    
    return account;
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    // Kiểm tra username đã tồn tại chưa
    const existingAccount = await this.accountRepository.findOne({
      where: { username: createAccountDto.username },
    });
    
    if (existingAccount) {
      throw new ConflictException(`Username ${createAccountDto.username} đã tồn tại`);
    }
    
    // Kiểm tra employee có tồn tại không
    const employee = await this.employeeRepository.findOne({
      where: { id: createAccountDto.employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException(`Nhân viên với ID ${createAccountDto.employeeId} không tồn tại`);
    }
    
    // Kiểm tra employee đã có tài khoản chưa
    const existingEmployeeAccount = await this.accountRepository.findOne({
      where: { employee: { id: createAccountDto.employeeId } },
    });
    
    if (existingEmployeeAccount) {
      throw new ConflictException(`Nhân viên với ID ${createAccountDto.employeeId} đã có tài khoản`);
    }
    
    // Kiểm tra role có tồn tại không
    const role = await this.roleRepository.findOne({
      where: { id: createAccountDto.roleId },
    });
    
    if (!role) {
      throw new NotFoundException(`Quyền với ID ${createAccountDto.roleId} không tồn tại`);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createAccountDto.password, salt);
    
    // Tạo tài khoản mới
    const account = this.accountRepository.create({
      username: createAccountDto.username,
      password: hashedPassword,
      isActive: createAccountDto.isActive ?? true,
      employee: employee,
      role: role,
    });
    
    return this.accountRepository.save(account);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id);
    
    // Nếu có cập nhật password thì hash
    if (updateAccountDto.password) {
      const salt = await bcrypt.genSalt();
      account.password = await bcrypt.hash(updateAccountDto.password, salt);
    }
    
    // Cập nhật các trường khác
    if (updateAccountDto.username !== undefined) {
      // Kiểm tra username mới có trùng với người khác không
      const existingAccount = await this.accountRepository.findOne({
        where: { username: updateAccountDto.username },
      });
      
      if (existingAccount && existingAccount.id !== id) {
        throw new ConflictException(`Username ${updateAccountDto.username} đã tồn tại`);
      }
      
      account.username = updateAccountDto.username;
    }
    
    if (updateAccountDto.isActive !== undefined) {
      account.isActive = updateAccountDto.isActive;
    }
    
    // Cập nhật role nếu có
    if (updateAccountDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { id: updateAccountDto.roleId },
      });
      
      if (!role) {
        throw new NotFoundException(`Quyền với ID ${updateAccountDto.roleId} không tồn tại`);
      }
      
      account.role = role;
    }
    
    // Cập nhật employee nếu có
    if (updateAccountDto.employeeId) {
      const employee = await this.employeeRepository.findOne({
        where: { id: updateAccountDto.employeeId },
      });
      
      if (!employee) {
        throw new NotFoundException(`Nhân viên với ID ${updateAccountDto.employeeId} không tồn tại`);
      }
      
      // Kiểm tra employee mới đã có tài khoản chưa
      const existingEmployeeAccount = await this.accountRepository.findOne({
        where: { employee: { id: updateAccountDto.employeeId } },
      });
      
      if (existingEmployeeAccount && existingEmployeeAccount.id !== id) {
        throw new ConflictException(`Nhân viên với ID ${updateAccountDto.employeeId} đã có tài khoản`);
      }
      
      account.employee = employee;
    }
    
    return this.accountRepository.save(account);
  }

  async remove(id: number): Promise<void> {
    const account = await this.findOne(id);
    await this.accountRepository.remove(account);
  }

  async validateAccount(username: string, password: string): Promise<Account> {
    try {
      const account = await this.findByUsername(username);
      
      if (!account.isActive) {
        throw new BadRequestException('Tài khoản đã bị vô hiệu hóa');
      }
      
      const isPasswordValid = await bcrypt.compare(password, account.password);
      
      if (!isPasswordValid) {
        throw new BadRequestException('Mật khẩu không chính xác');
      }
      
      // Cập nhật thời gian đăng nhập cuối
      account.lastLogin = new Date();
      await this.accountRepository.save(account);
      
      return account;
    } catch (error) {
      throw new BadRequestException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  }
}
