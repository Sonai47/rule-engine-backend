/**
 * Generic operator comparison utility.
 * Performs comparison between actual user value and expected rule value.
 */
export function compareValues(
  actual: any,
  operator: string,
  expected: any
): boolean {
  if (actual === undefined || actual === null) {
    return false;
  }

  switch (operator) {
    case '=':
    case '==':
      return actual === expected;
    case '!=':
      return actual !== expected;
    case '<':
      return actual < expected;
    case '<=':
      return actual <= expected;
    case '>':
      return actual > expected;
    case '>=':
      return actual >= expected;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

