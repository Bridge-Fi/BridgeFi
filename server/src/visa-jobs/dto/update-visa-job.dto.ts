import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaJobDto } from './create-visa-job.dto';

export class UpdateVisaJobDto extends PartialType(CreateVisaJobDto) {}
