import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudModule } from '@ultimate-backend/cloud';
import { RedisModule } from '@ultimate-backend/redis';
import { ConsulModule } from '@ultimate-backend/consul';
import { LoadBalancerModule } from '@ultimate-backend/loadbalancer';
import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import * as path from 'path';
import { EtcdModule } from '@ultimate-backend/etcd';
import { ZookeeperModule } from '@ultimate-backend/zookeeper';

@Module({
  imports: [
    CloudModule.forRoot({
      registry: {
        discoverer: 'zookeeper',
        service: {
          id: 'adv-example',
          port: 3332,
          address: 'localhost',
          name: 'adv-example',
        },
      },
    }),
    LoadBalancerModule.forRoot(),
    ConfigModule.forRoot({
      load: [
        {
          source: ConfigSource.Consul,
          key: 'ultimate-backend',
        },
        {
          source: ConfigSource.Consul,
          key: 'ultimate-backend-2',
        },
        {
          source: ConfigSource.Etcd,
          key: 'ultimate-backend',
        },
        {
          source: ConfigSource.Zookeeper,
          key: '/ultimate-backend',
        },
        {
          source: ConfigSource.File,
          filePath: path.resolve(__dirname, 'assets/config.json'),
        },
        {
          source: ConfigSource.Env,
          envFilePath: path.resolve(__dirname, 'assets/config.env'),
          prefix: 'UB',
        },
      ],
    }),
    ConsulModule.forRoot({
      host: 'localhost',
      port: '8500',
      debug: true,
    }),
    ZookeeperModule.forRoot({
      host: 'localhost:2181',
      debug: true,
    }),
    EtcdModule.forRoot({
      etcdOptions: {
        hosts: '127.0.0.1:2379',
      },
    }),
    RedisModule.forRoot({
      redisOptions: {
        host: 'localhost',
        port: 6379,
        db: 0,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
