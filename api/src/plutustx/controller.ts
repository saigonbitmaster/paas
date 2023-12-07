import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
  Query,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { CreatePlutusTxDto } from './dto/create.dto';
import { UpdatePlutusTxDto } from './dto/update.dto';
import { PlutusTxService } from './service';
import { queryTransform, formatRaList } from '../flatworks/utils/getlist';
import * as lodash from 'lodash';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('plutustxs')
export class PlutusTxController {
  constructor(private readonly service: PlutusTxService) {}

  @Get()
  async index(@Response() res: any, @Query() query, @Req() request) {
    const mongooseQuery = queryTransform(query);
    mongooseQuery.filter.queryType == 'developer'
      ? (mongooseQuery.filter.lockUserId = lodash.get(
          request,
          'user.userId',
          null,
        ))
      : //  : (mongooseQuery.filter._id = null);
        null;
    delete mongooseQuery.filter.queryType;
    const result = await this.service.findAll(mongooseQuery);
    return formatRaList(res, result);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createPlutusTxDto: CreatePlutusTxDto, @Request() req) {
    const userId = req.user.userId;
    return await this.service.create({
      ...createPlutusTxDto,
      lockUserId: userId,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlutusTxDto: UpdatePlutusTxDto,
  ) {
    return await this.service.update(id, updatePlutusTxDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
