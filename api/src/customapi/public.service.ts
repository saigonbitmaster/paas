import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenReceiverDto } from './dto/create.token-receiver.dto';
import { UpdateTokenReceiverDto } from './dto/update.token-receiver.dto';
import { CreateCampaignDto } from './dto/create.campaign.dto';
import { UpdateCampaignDto } from './dto/update.campaign.dto';
import {
  TokenReceiver,
  TokenReceiverDocument,
} from './schemas/token-receiver.schema';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { validateAddress } from '../flatworks/utils/cardano';
import { validateEmail } from '../flatworks/utils/common';
import { DashboardCardData } from '../flatworks/types/types';
import { PlutusTxService } from '../plutustx/service';
import { UserService } from '../user/user.service';

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(TokenReceiver.name)
    private readonly token: Model<TokenReceiverDocument>,
    @InjectModel(Campaign.name)
    private readonly campaign: Model<CampaignDocument>,
    private readonly plutusTxService: PlutusTxService,
    private readonly userService: UserService,
  ) {}

  async getDashboardData(): Promise<any> {
    const data = [];
    return data;
  }

  async findAllTokenReceiver(query: MongooseQuery): Promise<RaList> {
    const count = await this.token.find(query.filter).count().exec();
    const data = await this.token
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findTokenReceiverById(id: string): Promise<TokenReceiver> {
    return await this.token.findById(id).exec();
  }

  async createTokenReceiver(
    createTokenReceiverDto: CreateTokenReceiverDto,
  ): Promise<TokenReceiver> {
    const activeCampaign = await this.findOneCampaign({ isActive: true });

    const isAddress = await validateAddress(createTokenReceiverDto.address);
    const isEmail = validateEmail(createTokenReceiverDto.email);
    if (!isEmail) {
      throw new HttpException('Not a valid email', HttpStatus.NOT_ACCEPTABLE);
    }

    if (!activeCampaign) {
      throw new HttpException('No active campaign', HttpStatus.NOT_FOUND);
    }
    if (!isAddress) {
      throw new HttpException(
        'Not a valid Cardano wallet address',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return await new this.token({
      ...createTokenReceiverDto,
      campaignId: activeCampaign._id,
      createdAt: new Date(),
    }).save();
  }

  async updateTokenReceiver(
    id: string,
    updateTokenReceiverDto: UpdateTokenReceiverDto,
  ): Promise<TokenReceiver> {
    return await this.token
      .findByIdAndUpdate(id, updateTokenReceiverDto)
      .exec();
  }

  async deleteTokenReceiver(id: string): Promise<TokenReceiver> {
    return await this.token.findByIdAndDelete(id).exec();
  }

  async findAllCampaign(query: MongooseQuery): Promise<RaList> {
    const count = await this.campaign.find(query.filter).count().exec();

    const data = await this.campaign
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    return { count: count, data: data };
  }

  async findCampaignById(id: string): Promise<Campaign> {
    return await this.campaign.findById(id).exec();
  }

  async findOneCampaign(filter = {}): Promise<CampaignDocument> {
    return await this.campaign.findOne(filter).exec();
  }

  async createCampaign(
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    return await new this.campaign({
      ...createCampaignDto,
      createdAt: new Date(),
    }).save();
  }

  async updateCampaign(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    return await this.campaign.findByIdAndUpdate(id, updateCampaignDto).exec();
  }

  async deleteCampaign(id: string): Promise<Campaign> {
    return await this.campaign.findByIdAndDelete(id).exec();
  }
}
