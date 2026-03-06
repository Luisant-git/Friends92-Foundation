import { Module } from '@nestjs/common';
import { TrusteeController } from './trustee.controller';
import { TrusteeService } from './trustee.service';

@Module({
  controllers: [TrusteeController],
  providers: [TrusteeService],
})
export class TrusteeModule {}