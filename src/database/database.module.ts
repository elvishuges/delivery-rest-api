import { getMetadataArgsStorage } from 'typeorm';

import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from '@/config/database.config';

const logging = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigType<typeof databaseConfig>) => ({
        ...config,
        type: 'mysql',
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        synchronize: true,
        keepConnectionAlive: true,
        logging,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
})
export class DatabaseModule { }
