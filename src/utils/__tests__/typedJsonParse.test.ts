import { ValidationError } from '../../errors';
import { ajv } from '../ajv';
import { typedJsonParse } from '..';
import type { JSONSchemaType } from 'ajv';

interface Target {
  foo: string;
  bar: {
    baz: number;
  };
}

export const targetSchema: JSONSchemaType<Target> = {
  type: 'object',
  properties: {
    foo: {
      type: 'string',
    },
    bar: {
      type: 'object',
      properties: {
        baz: {
          type: 'integer',
        },
      },
      required: [
        'baz',
      ],
    },
  },
  required: [
    'foo',
    'bar',
  ],
};

export const isTarget = ajv.compile(targetSchema);

describe('typedJsonParse', () => {
  it('should properly parse a JSON string with an expected shape', () => {
    const target = {
      foo: 'hello',
      bar: {
        baz: 42,
      },
    };
    const jsonString = JSON.stringify(target);
    expect(typedJsonParse(jsonString, isTarget)).toEqual(target);
  });
  it('should throw an error when provided a JSON string with an unexpected shape', () => {
    const miss = {
      blarg: 'hahaha',
    };
    const jsonString = JSON.stringify(miss);
    expect(() => typedJsonParse(jsonString, isTarget)).toThrow(ValidationError);
  });
});
