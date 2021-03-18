import { Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';

@Injectable()
export class AppService {
  @ConfigValue('soup', 'kola nut')
  newConfigKey: any;

  getData(): { message: string } {
    return { message: `Welcome to adv-example! ${this.newConfigKey}` };
  }
}
