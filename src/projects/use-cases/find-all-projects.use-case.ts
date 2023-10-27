import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../interfaces/project.repository';

@Injectable()
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}
  execute() {
    return this.projectRepository.findAll();
  }
}
