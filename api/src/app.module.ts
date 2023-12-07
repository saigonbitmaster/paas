import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/module';
import { ToolModule } from './tool/module';
import { WalletModule } from './wallet/module';
import { ContractModule } from './contract/module';
import { PlutusTxModule } from './plutustx/module';
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { AdminWalletModule } from './adminwallet/module';
import { PublicModule } from './customapi/module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccessTokenModule } from './accesstoken/module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CONNECTION_STRING,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    CurrencyModule,
    ToolModule,
    WalletModule,
    QueueModule,
    ContractModule,
    PlutusTxModule,
    AdminWalletModule,
    PublicModule,
    MailModule,
    AccessTokenModule,
  ],
})
export class AppModule {}
