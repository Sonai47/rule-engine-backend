import { Scheme } from '../types/scheme.type';
import { getAllSchemes, SchemeRepository } from './scheme.repository';

/**
 * Service responsible for scheme retrieval operations.
 */
export class SchemeService {
  private schemeRepository: SchemeRepository;

  constructor(repository?: SchemeRepository) {
    this.schemeRepository = repository || new SchemeRepository();
  }

  async fetchAllSchemes(): Promise<Scheme[]> {
    return await this.schemeRepository.getAllSchemes();
  }
}

export async function fetchAllSchemes(): Promise<Scheme[]> {
  return await getAllSchemes();
}

