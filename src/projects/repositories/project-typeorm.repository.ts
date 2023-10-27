import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interfaces/project.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectTypeOrmRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly typeOrmRepository: Repository<Project>,
  ) {}

  async create(project: Project): Promise<void> {
    await this.typeOrmRepository.save(project);
  }
  async update(project: Project): Promise<void> {
    await this.typeOrmRepository.update(project.id, project);
  }
  findAll(): Promise<Project[]> {
    return this.typeOrmRepository.find();
  }
  findById(id: string): Promise<Project> {
    return this.typeOrmRepository.findOneOrFail({
      where: { id },
    });
  }
}
