import * as fs from 'fs/promises';
import * as path from 'path';
import { Scheme } from '../types/scheme.type';

/**
 * Repository responsible for reading scheme data.
 * Currently uses a local JSON file as a temporary mock database.
 * Can easily be swapped with a PostgreSQL/Prisma implementation later.
 */
export class SchemeRepository {
  private jsonPath: string;

  constructor(filePath?: string) {
    this.jsonPath = filePath || path.resolve(__dirname, '../data/schemes.json');
  }

  /**
   * Loads all schemes from the database/JSON source.
   */
  async getAllSchemes(): Promise<Scheme[]> {
    const rawData = await fs.readFile(this.jsonPath, 'utf-8');
    const schemes: Scheme[] = JSON.parse(rawData);
    return schemes;
  }
}

export async function getAllSchemes(): Promise<Scheme[]> {
  const repo = new SchemeRepository();
  return repo.getAllSchemes();
}