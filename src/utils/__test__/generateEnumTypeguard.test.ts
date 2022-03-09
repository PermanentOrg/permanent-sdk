import { generateEnumTypeguard } from '../';

enum TestControlEnum {
  OtherEnumValue = 'otherValue',
}

describe('generateEnumTypeguard', () => {
  it('should generate a working typeguard for string enums', () => {
    enum TestEnum {
      TestEnumKeyA = 'myValueA',
      TestEnumKeyB = 'myValueB',
    }
    const isTestEnum = generateEnumTypeguard(TestEnum);
    expect(isTestEnum(TestEnum.TestEnumKeyA)).toBe(true);
    expect(isTestEnum(TestEnum.TestEnumKeyB)).toBe(true);
    expect(isTestEnum(TestControlEnum.OtherEnumValue)).toBe(false);
    expect(isTestEnum(42)).toBe(false);
    expect(isTestEnum('hello')).toBe(false);
  });

  it('should generate a working typeguard for numeric enums', () => {
    enum TestEnum {
      TestEnumKeyA = 1,
      TestEnumKeyB = 2,
    }
    const isTestEnum = generateEnumTypeguard(TestEnum);
    expect(isTestEnum(TestEnum.TestEnumKeyA)).toBe(true);
    expect(isTestEnum(TestEnum.TestEnumKeyB)).toBe(true);
    expect(isTestEnum(TestControlEnum.OtherEnumValue)).toBe(false);
    expect(isTestEnum(42)).toBe(false);
    expect(isTestEnum('hello')).toBe(false);
  });
});
