import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VisaJobsService } from './visa-jobs.service';
import { CreateVisaJobDto } from './dto/create-visa-job.dto';
import { UpdateVisaJobDto } from './dto/update-visa-job.dto';
import { ListJobsDto } from './dto/list-jobs.dto';

@Controller('api/visa-jobs')
export class VisaJobsController {
  constructor(private readonly visaJobsService: VisaJobsService) {}

  @Post()
  create(@Body() dto: CreateVisaJobDto) {
    return this.visaJobsService.create(dto);
  }

  @Get()
  async list(@Query() query: ListJobsDto) {
    return this.visaJobsService.findAndCount(query);
  }

  @Get()
  async getVisaJobs(@Query() filter: ListJobsDto) {
    return this.visaJobsService.findAndCount(filter);
  }

  @Patch(':caseNumber')
  update(
    @Param('caseNumber') caseNumber: string,
    @Body() dto: UpdateVisaJobDto,
  ) {
    return this.visaJobsService.update(caseNumber, dto);
  }

  @Delete(':caseNumber')
  remove(@Param('caseNumber') caseNumber: string) {
    return this.visaJobsService.remove(caseNumber);
  }
}
