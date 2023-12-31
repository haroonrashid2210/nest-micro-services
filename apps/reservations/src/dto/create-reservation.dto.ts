import { Type } from 'class-transformer';
import { IsDate, IsMongoId, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsMongoId()
  placeId: string;

  @IsString()
  @IsMongoId()
  invoiceId: string;
}
