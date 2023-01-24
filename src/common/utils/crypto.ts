import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class GenerateRandToken {
  /**
   * Generates session tokens
   */
  public async authToken(): Promise<string> {
    const hash = await promisify(randomBytes)(32);
    return hash.toString('hex');
  }
}
