import { IsNumber, IsOptional, IsPositive, Max } from "class-validator";

//Class to handle pagination data
export class PaginationQueryDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Max(3)
  limit: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;
}
