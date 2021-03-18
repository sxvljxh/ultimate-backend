import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudModule } from '@ultimate-backend/cloud';
import { ConsulModule } from '@ultimate-backend/consul';
import { EtcdModule } from '@ultimate-backend/etcd';
import { ZookeeperModule } from '@ultimate-backend/zookeeper';

@Module({
  imports: [
    CloudModule.forRoot({
      registry: {
        discoverer: 'zookeeper',
        service: {
          id: 'example2',
          port: 3333,
          name: 'example',
          address: 'localhost',
        },
      },
    }),
    EtcdModule.forRoot({
      etcdOptions: {
        hosts: '127.0.0.1:2379',
      },
    }),
    ZookeeperModule.forRoot({
      host: 'localhost:2181',
      debug: true,
    }),
    ConsulModule.forRoot({
      port: '8500',
      host: 'localhost',
      promisify: true,
      secure: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
