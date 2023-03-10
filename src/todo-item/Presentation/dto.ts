import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoItemDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsMongoId()
  todoListId: string;
}

export class UpdateTotoItemDTO {
  @ApiProperty({ type: String })
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsMongoId()
  @IsOptional()
  todoListId: string;
}
