import { bRules } from '../index.js';
// https://mochajs.org/#nodejs-native-esm-support
import assert from 'assert';

// TODO 테스트 파일은 다음 명령으로 실행해주세요.
// $ npm test

describe('essentials', () => {
  it('isNumber', () => {
    // https://mochajs.org/#assertions
    // https://nodejs.org/api/assert.html
    assert.equal(bRules.isNumber()(1), true);
    assert.equal(bRules.isNumber()(-1), true);
    assert.equal(bRules.isNumber()(0), true);
    assert.equal(bRules.isNumber()(NaN), false);
    assert.equal(bRules.isNumber()(null), false);
    assert.equal(bRules.isNumber()(undefined), false);
    assert.equal(bRules.isNumber()([]), false);
  });
});
