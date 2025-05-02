import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLawyerDto } from './dto/create-lawyer.dto';
import { Lawyer } from './entities/lawyer.entity';
import { UpdateLawyerDto } from './dto/update-lawyer.dto';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(Lawyer)
    private readonly lawyerRepository: Repository<Lawyer>,
  ) {}

  async create(createLawyerDto: CreateLawyerDto): Promise<Lawyer> {
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
    });
  }

  async update(id: number, updateLawyerDto: UpdateLawyerDto): Promise<Lawyer> {
    const lawyer = await this.lawyerRepository.findOne({
      where: { id },
    });

    if (!lawyer) {
      throw new NotFoundException(`Lawyer with ID ${id} not found`);
    }

    if (updateLawyerDto.email && updateLawyerDto.email !== lawyer.email) {
      const existingLawyer = await this.lawyerRepository.findOne({
        where: { email: updateLawyerDto.email },
      });
      if (existingLawyer) {
        throw new ConflictException('Email already exists');
      }
    }

    if (
      updateLawyerDto.barNumber &&
      updateLawyerDto.barNumber !== lawyer.barNumber
    ) {
      const existingBarNumber = await this.lawyerRepository.findOne({
        where: { barNumber: updateLawyerDto.barNumber },
      });
      if (existingBarNumber) {
        throw new ConflictException('Bar number already exists');
      }
    }

    Object.assign(lawyer, updateLawyerDto);
    return this.lawyerRepository.save(lawyer);
  }

  async remove(id: number): Promise<void> {
    const result = await this.lawyerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lawyer with ID ${id} not found`);
    }
  }
}
