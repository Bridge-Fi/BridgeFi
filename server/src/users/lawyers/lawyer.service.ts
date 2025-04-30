import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateLawyerDto } from '../dtos/create-lawyer-dto';
import { Lawyer } from '../entities/lawyer.entity';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(Lawyer)
    private readonly lawyerRepository: Repository<Lawyer>,
  ) {}

  async create(createLawyerDto: CreateLawyerDto, admin: User): Promise<Lawyer> {
    const existingEmail = await this.lawyerRepository.findOne({
      where: { email: createLawyerDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingBarNumber = await this.lawyerRepository.findOne({
      where: { barNumber: createLawyerDto.barNumber },
    });
    if (existingBarNumber) {
      throw new ConflictException('Bar number already exists');
    }

    try {
      const lawyer = this.lawyerRepository.create({
        ...createLawyerDto,
        yearsOfExperience: createLawyerDto.yearsOfExperience || null,
        lawFirm: createLawyerDto.lawFirm || null,
        createdById: admin.id,
        verified: false,
      });

      return await this.lawyerRepository.save(lawyer);
    } catch (error) {
      console.error('Error creating lawyer:', error);
      throw new InternalServerErrorException('Failed to create lawyer profile');
    }
  }

  async findAll(): Promise<Lawyer[]> {
    return this.lawyerRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['createdBy'],
    });
  }
}
