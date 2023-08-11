import { ValidationError } from '../errors';
import type { ValidateFunction } from 'ajv';

export const typedJsonParse = <T>(
  jsonString: string,
  typeguard: ValidateFunction<T>,
): T => {
  const value = JSON.parse(jsonString) as unknown;
  if (typeguard(value)) {
    return value;
  }

  throw new ValidationError(
    `Invalid JSON object structure when validated by '${typeguard.name}'`,
    typeguard.errors,
    value,
  );
};
