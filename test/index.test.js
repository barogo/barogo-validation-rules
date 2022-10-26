import { validator } from '../index.js';
// https://mochajs.org/#nodejs-native-esm-support
import assert from 'assert';

// TODO 테스트 파일은 다음 명령으로 실행해주세요.
// $ npm test

describe('validator', () => {
  it('isNumber', () => {
    // https://mochajs.org/#assertions
    // https://nodejs.org/api/assert.html
    assert.equal(validator.isNumber(1), true);
    assert.equal(validator.isNumber(0.1), true);
    assert.equal(validator.isNumber(-1), true);
    assert.equal(validator.isNumber(0), true);
    assert.equal(validator.isNumber(-1.1), true);
    assert.equal(validator.isNumber(Infinity), true);
    assert.equal(validator.isNumber(-Infinity), true);
    assert.equal(validator.isNumber(Number.NEGATIVE_INFINITY), true);
    assert.equal(validator.isNumber(Number.POSITIVE_INFINITY), true);
    assert.equal(validator.isNumber(Number.POSITIVE_INFINITY), true);
    assert.equal(validator.isNumber(Number.MIN_VALUE), true);
    assert.equal(validator.isNumber(Number.MAX_VALUE), true);
    assert.equal(validator.isNumber(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isNumber(Number.MIN_SAFE_INTEGER), true);
    assert.equal(validator.isNumber(Number.EPSILON), true);
    assert.equal(validator.isNumber(NaN), false);
    assert.equal(validator.isNumber(null), false);
    assert.equal(validator.isNumber(undefined), false);
    assert.equal(validator.isNumber(''), false);
    assert.equal(validator.isNumber('123'), false);
    assert.equal(validator.isNumber([]), false);
    assert.equal(validator.isNumber({}), false);
    assert.equal(validator.isNumber(Symbol()), false);    
  });

  it('isInteger', () => {
    assert.equal(validator.isInteger(1), true);
    assert.equal(validator.isInteger(-1), true);
    assert.equal(validator.isInteger(0), true);
    assert.equal(validator.isInteger(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isInteger(Number.MIN_SAFE_INTEGER), true);
    assert.equal(validator.isInteger(0.1), false);
    assert.equal(validator.isInteger(-1.1), false);
    assert.equal(validator.isInteger(Infinity), false);
    assert.equal(validator.isInteger(-Infinity), false);
    assert.equal(validator.isInteger(Number.NEGATIVE_INFINITY), false);
    assert.equal(validator.isInteger(Number.POSITIVE_INFINITY), false);
    assert.equal(validator.isInteger(Number.POSITIVE_INFINITY), false);
    assert.equal(validator.isInteger(Number.MIN_VALUE), false);
    assert.equal(validator.isInteger(Number.MAX_VALUE), false);
    assert.equal(validator.isInteger(Number.EPSILON), false);
    assert.equal(validator.isInteger(NaN), false);
    assert.equal(validator.isInteger(null), false);
    assert.equal(validator.isInteger(undefined), false);
    assert.equal(validator.isInteger(''), false);
    assert.equal(validator.isInteger('123'), false);
    assert.equal(validator.isInteger([]), false);
    assert.equal(validator.isInteger({}), false);
    assert.equal(validator.isInteger(Symbol()), false);  
  });

  it('isTelephone', () => {
    assert.equal(validator.isTelephone('12345678'), true);
    assert.equal(validator.isTelephone('123456789012'), true);
    assert.equal(validator.isTelephone('1234567890123'), false);
    assert.equal(validator.isTelephone('1234'), false);
    assert.equal(validator.isTelephone('abc'), false);
    assert.equal(validator.isTelephone('abc1234567890'), false);
    assert.equal(validator.isTelephone('abc12345'), false);
    assert.equal(validator.isTelephone('가나다'), false);
    assert.equal(validator.isTelephone('가나다1234567890'), false);
    assert.equal(validator.isTelephone('가나다12345'), false);
    assert.equal(validator.isTelephone(''), false);
    assert.equal(validator.isTelephone(null), false);
    assert.equal(validator.isTelephone(undefined), false);
    assert.equal(validator.isTelephone(12345678), false);
  });

  it('isCellPhone', () => {
    assert.equal(validator.isCellPhone('0987654321'), true);
    assert.equal(validator.isCellPhone('09876543210'), true); 
    assert.equal(validator.isCellPhone('098765432101'), false);
    assert.equal(validator.isCellPhone('098765432'), false);
    assert.equal(validator.isCellPhone('abc'), false);
    assert.equal(validator.isCellPhone('abc0987654'), false);
    assert.equal(validator.isCellPhone('abc09876'), false);
    assert.equal(validator.isCellPhone('가나다'), false);
    assert.equal(validator.isCellPhone('가나다0987654'), false);
    assert.equal(validator.isCellPhone('가나다09876'), false);
    assert.equal(validator.isCellPhone(''), false);
    assert.equal(validator.isCellPhone(null), false);
    assert.equal(validator.isCellPhone(undefined), false);
    assert.equal(validator.isCellPhone(12345678), false);
  });  
});
