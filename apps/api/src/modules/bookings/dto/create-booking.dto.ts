import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class CreateParticipantDto {
  @IsString() name!: string;
  @IsOptional() @IsString() whatsapp?: string;
  @IsOptional() @IsEmail() email?: string;
}

export class CreateBookingDto {
  @IsUUID() scheduleId!: string;
  @IsString() contactName!: string;
  @IsString() contactWhatsapp!: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsInt() @Min(1) participantCount!: number;
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => CreateParticipantDto)
  participants!: CreateParticipantDto[];
}
