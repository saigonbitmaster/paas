import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContractDto } from './dto/create.dto';
import { UpdateContractDto } from './dto/update.dto';
import { Contract, ContractDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name) private readonly model: Model<ContractDocument>,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findOne(id: string): Promise<Contract> {
    return await this.model.findById(id).exec();
  }

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    return await new this.model({
      ...createContractDto,
      createdAt: new Date(),
      code: createContractDto.cborhex,
    }).save();
  }

  async update(
    id: string,
    updateContractDto: UpdateContractDto,
    userId: string,
  ): Promise<Contract> {
    const contract = await this.findOne(id);
    if (contract.author !== userId)
      throw new BadRequestException(
        'This is not your contract, the action is not allowed',
      );
    return await this.model.findByIdAndUpdate(id, updateContractDto).exec();
  }

  async delete(id: string, userId: string): Promise<Contract> {
    const contract = await this.findOne(id);
    if (contract.author !== userId)
      throw new BadRequestException(
        'This is not your contract, the action is not allowed',
      );
    return await this.model.findByIdAndDelete(id).exec();
  }
}
