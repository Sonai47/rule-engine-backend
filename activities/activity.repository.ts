import { Scheme } from '../types/scheme.type';

/**
 * Repository responsible for activity data access.
 */
export class ActivityRepository {
  /**
   * Retrieves supported activities for a given scheme.
   */
  getActivitiesForScheme(scheme: Scheme): string[] {
    return scheme.activities || [];
  }
}

