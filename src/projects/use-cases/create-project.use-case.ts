import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  execute(input: CreateProjectDto) {
    const project = new Project(input);
    if (input.started_at) {
      project.status = ProjectStatus.Active;
    }

    return this.projectRepository.save(project);
  }
}
