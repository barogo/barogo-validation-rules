import { validator } from '../index.js';
// https://mochajs.org/#nodejs-native-esm-support
import assert from 'assert';

// TODO 테스트 파일은 다음 명령으로 실행해주세요.
// $ npm test

describe('validator', () => {
  it('isNumber:valid', () => {
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
    assert.equal(validator.isNumber(Number.MIN_VALUE), true);
    assert.equal(validator.isNumber(Number.MAX_VALUE), true);
    assert.equal(validator.isNumber(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isNumber(Number.MIN_SAFE_INTEGER), true);
    assert.equal(validator.isNumber(Number.EPSILON), true);
  });

  it('isNumber:not valid', () => {
    assert.equal(validator.isNumber(NaN), false);
    assert.equal(validator.isNumber(null), false);
    assert.equal(validator.isNumber(undefined), false);
    assert.equal(validator.isNumber(''), false);
    assert.equal(validator.isNumber('123'), false);
    assert.equal(validator.isNumber([]), false);
    assert.equal(validator.isNumber({}), false);
    assert.equal(validator.isNumber(Symbol()), false);    
  });  

  it('isFloat:valid', () => {
    assert.equal(validator.isFloat(1), true);
    assert.equal(validator.isFloat(-1), true);
    assert.equal(validator.isFloat(0), true);
    assert.equal(validator.isFloat(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isFloat(Number.MIN_SAFE_INTEGER), true);
    assert.equal(validator.isFloat(0.1), true);
    assert.equal(validator.isFloat(-1.1), true);
    // NOTE: MIN_VALUE, MAX_VALUE는 실수임 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Number.MIN_VALUE), true);
    assert.equal(validator.isFloat(Number.MAX_VALUE), true);
    // NOTE: elipson은 실수(float)임 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Number.EPSILON), true);
  });
  
  it('isFloat:not valid', () => {
    // NOTE: isNumber 검사에서는 성공했으나 isFloat 에서는 실패
    // NOTE: 무한(Infinity)은 실수가 아님 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Infinity), false);
    assert.equal(validator.isFloat(-Infinity), false);
    assert.equal(validator.isFloat(Number.NEGATIVE_INFINITY), false);
    assert.equal(validator.isFloat(Number.POSITIVE_INFINITY), false);
  });   

  it('isInteger:valid', () => {
    assert.equal(validator.isInteger(1), true);
    assert.equal(validator.isInteger(-1), true);
    assert.equal(validator.isInteger(0), true);
    assert.equal(validator.isInteger(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isInteger(Number.MIN_SAFE_INTEGER), true);
  });

  it('isInteger:not valid', () => {
    // NOTE: isFloat 검사에서는 성공했으나 isInteger 에서는 실패
    assert.equal(validator.isInteger(0.1), false);
    assert.equal(validator.isInteger(-1.1), false);
    assert.equal(validator.isInteger(Number.MIN_VALUE), false);
    assert.equal(validator.isInteger(Number.MAX_VALUE), false);
  });  

  it('isPositiveInteger:valid', () => {
    assert.equal(validator.isPositiveInteger(1), true);
  });

  it('isPositiveInteger:not valid', () => {
    // NOTE: isInteger 검사에서는 성공했으나 isPositiveInteger 에서는 실패
    assert.equal(validator.isPositiveInteger(1), true);
    assert.equal(validator.isPositiveInteger(0), false);
    assert.equal(validator.isPositiveInteger(-1), false);
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
