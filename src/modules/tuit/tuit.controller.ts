import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PaginationQueryDto, CreateRequestDto, UpdateRequestDto } from './dto';
import { Tuit } from './tuit.entity';
import { TuitService } from './tuit.service';

@Controller('tuit')
export class TuitController {
  constructor(private readonly tuitterService: TuitService) {}

  @Get()
  //Injectors like Query, Body, Param could provide a "RequestDto" using ValidationPipe registered in main.ts
  getTuits(@Query() paginationQuery: PaginationQueryDto): Promise<Tuit[]> {
    return this.tuitterService.getAll(paginationQuery);
  }

  @Get(':id')
  //Technically query/url params are strings, but using ValidationPipe and enableImplicitConversion, this will assign the proper casted type
  getTuit(@Param('id') id: number): Promise<Tuit> {
    return this.tuitterService.getById(id);
  }

  @Post()
  //This is how we handle custom code response
  @HttpCode(HttpStatus.CREATED)
  createTuit(@Body() createRequestDto: CreateRequestDto): Promise<void> {
    return this.tuitterService.createTuit(createRequestDto);
  }

  @Patch(':id')
  updateTuit(
    @Param('id') id: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ): Promise<Tuit> {
    return this.tuitterService.updateTuit(id, updateRequestDto);
  }

  @Delete(':id')
  removeTuit(@Param('id') id: number): Promise<void> {
    return this.tuitterService.removeTuit(id);
  }
}
