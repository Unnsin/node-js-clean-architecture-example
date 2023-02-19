import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoListDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  author: string;
}

export class UpdateTodoListDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  author: string;
}
