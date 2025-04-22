import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLawyerDto } from '../dtos/create-lawyer-dto';
import { Lawyer } from '../entities/lawyer.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Lawyer)
    private readonly lawyerRepository: Repository<Lawyer>,
  ) {}

  async createLawyer(createLawyerDto: CreateLawyerDto): Promise<Lawyer> {
    const lawyer = this.lawyerRepository.create(createLawyerDto);
    return this.lawyerRepository.save(lawyer);
  }

  async updateLawyer(
    id: number,
    updateLawyerDto: CreateLawyerDto,
  ): Promise<Lawyer> {
    const updateResult = await this.lawyerRepository.update(
      id,
      updateLawyerDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Lawyer with id ${id} not found`);
    }
    const updatedLawyer = await this.lawyerRepository.findOneBy({ id });
    if (!updatedLawyer) {
      throw new NotFoundException(
        `Lawyer with id ${id} not found after update`,
      );
    }
    return updatedLawyer;
  }

  async deleteLawyer(id: number): Promise<{ message: string }> {
    const deleteResult = await this.lawyerRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Lawyer with id ${id} not found`);
    }
    return { message: 'Lawyer deleted successfully' };
  }
}
