import { Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

@Injectable()
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
    });

    if (project.status === ProjectStatus.Active) {
      throw new Error('Cannot start activated project');
    }

    if (project.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (project.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start cancelled project');
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;

    return this.projectRepository.save(project);
  }
}
