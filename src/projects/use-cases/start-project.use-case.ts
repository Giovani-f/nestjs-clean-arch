import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
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

    project.start(input.started_at);

    return this.projectRepository.save(project);
  }
}
