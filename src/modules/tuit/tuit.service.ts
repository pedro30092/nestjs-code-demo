import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { off } from 'process';
import { Repository } from 'typeorm';
import { CreateRequestDto, PaginationQueryDto, UpdateRequestDto } from './dto';
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitService {
  constructor(
    @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
  ) {}

  //We get offset and limit to handle how many rows we should fetch
  async getAll({ offset, limit }: PaginationQueryDto): Promise<Tuit[]> {
    return await this.tuitRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async getById(id: number): Promise<Tuit> {
    const tuit = await this.tuitRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!tuit) {
      throw new NotFoundException();
    }

    return tuit;
  }

  async createTuit({ message, user }: CreateRequestDto): Promise<void> {
    const tuit: Tuit = this.tuitRepository.create({ message, user });
    this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message }: UpdateRequestDto): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.preload({
      id,
      message
    });

    if (!tuit) {
      throw new NotFoundException('Update not succeded');
    }

    this.tuitRepository.save(tuit);

    return tuit;
  }

  async removeTuit(id: number): Promise<void> {
    const tuit: Tuit = await this.getById(id);

    if (!tuit) {
      throw new NotFoundException();
    }

    this.tuitRepository.remove(tuit);
  }
}
