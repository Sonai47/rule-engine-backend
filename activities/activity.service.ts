import { UserRequirements } from '../types/user_requirements.type';
import { Scheme } from '../types/scheme.type';
import { ActivityRepository } from './activity.repository';

export interface ActivityEligibilityResult {
  passed: boolean;
  reason: string;
}

/**
 * Service responsible for evaluating activity compatibility.
 */
export class ActivityService {
  private activityRepository: ActivityRepository;

  constructor(repository?: ActivityRepository) {
    this.activityRepository = repository || new ActivityRepository();
  }

  /**
   * Checks if the user's activity is supported by the given scheme.
   */
  isActivityEligible(user: UserRequirements, scheme: Scheme): ActivityEligibilityResult {
    const supportedActivities = this.activityRepository.getActivitiesForScheme(scheme);

    if (!supportedActivities || supportedActivities.length === 0) {
      return {
        passed: true,
        reason: 'Scheme has no specific activity restrictions.'
      };
    }

    const passed = supportedActivities.includes(user.activity);
    if (passed) {
      return {
        passed: true,
        reason: `Activity '${user.activity}' is supported by scheme.`
      };
    } else {
      return {
        passed: false,
        reason: `Activity '${user.activity}' is not in scheme's supported activities: [${supportedActivities.join(', ')}]`
      };
    }
  }
}

export function isActivityEligible(user: UserRequirements, scheme: Scheme): boolean {
  const service = new ActivityService();
  return service.isActivityEligible(user, scheme).passed;
}