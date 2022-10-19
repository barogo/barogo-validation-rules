const { bRules } = require('./index');

describe('essentials', () => {
  test('isNumber', () => {
    expect(bRules.isNumber(1)).toBeTruthy();
    expect(bRules.isNumber(-1)).toBeTruthy();
    expect(bRules.isNumber(0)).toBeTruthy();
    expect(bRules.isNumber(NaN)).toBeFalsy();
    expect(bRules.isNumber(null)).toBeFalsy();
    expect(bRules.isNumber(undefined)).toBeFalsy();
    expect(bRules.isNumber([])).toBeFalsy();
  });
});

