import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from './interfaces';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    console.log(options);
    console.log(this.envConfig);
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
