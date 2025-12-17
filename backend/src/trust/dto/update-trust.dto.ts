import { PartialType } from '@nestjs/mapped-types';
import { CreateTrustDto } from './create-trust.dto';

export class UpdateTrustDto extends PartialType(CreateTrustDto) {}