import { validator, bRules } from '../index.js';
// https://mochajs.org/#nodejs-native-esm-support
import assert from 'assert';

// TODO 테스트 파일은 다음 명령으로 실행해주세요.
// $ npm test

describe('validator', () => {
  it('isNumber:valid', () => {
    // https://mochajs.org/#assertions
    // https://nodejs.org/api/assert.html
    assert.equal(validator.isNumber(1), true);
    assert.equal(validator.isNumber(-1), true);
    assert.equal(validator.isNumber(0), true);
    assert.equal(validator.isNumber(0.1), true);
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
    assert.equal(validator.isNumber(() => ({})), false); 
  });  
  
  it('isFloat:valid', () => {
    // isNumber 성공 검사조건을 가져옴
    assert.equal(validator.isFloat(0.1), true);
    assert.equal(validator.isFloat(-1.1), true);
    assert.equal(validator.isFloat(Number.MIN_VALUE), true);
    assert.equal(validator.isFloat(Number.EPSILON), true);
    // isFloat 성공 검사조건
    assert.equal(validator.isFloat(0.1), true);
    assert.equal(validator.isFloat(-1.1), true);
    // NOTE: MIN_VALUE는 실수임 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Number.MIN_VALUE), true);
    // NOTE: elipson은 실수(float)임 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Number.EPSILON), true);
  });
    
  it('isFloat:not valid', () => {
    // isNumber 실패 검사조건
    assert.equal(validator.isFloat(NaN), false);
    assert.equal(validator.isFloat(null), false);
    assert.equal(validator.isFloat(undefined), false);
    assert.equal(validator.isFloat(''), false);
    assert.equal(validator.isFloat('123'), false);
    assert.equal(validator.isFloat([]), false);
    assert.equal(validator.isFloat({}), false);
    assert.equal(validator.isFloat(Symbol()), false);   
    assert.equal(validator.isFloat(() => ({})), false);
    // NOTE: isNumber 검사에서는 성공했으나 isFloat 에서는 실패
    // NOTE: 무한(Infinity)은 실수가 아님 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Infinity), false);
    assert.equal(validator.isFloat(-Infinity), false);
    assert.equal(validator.isFloat(Number.NEGATIVE_INFINITY), false);
    assert.equal(validator.isFloat(Number.POSITIVE_INFINITY), false);
    assert.equal(validator.isFloat(Number.MAX_SAFE_INTEGER), false);
    assert.equal(validator.isFloat(Number.MIN_SAFE_INTEGER), false);
    // NOTE: MAX_VALUE는 정수임 (MDN 링크 추가 필요!)
    assert.equal(validator.isFloat(Number.MAX_VALUE), false);
    assert.equal(validator.isFloat(1), false);
    assert.equal(validator.isFloat(-1), false);
    assert.equal(validator.isFloat(0), false);
  });  

  it('isInteger:valid', () => {
    assert.equal(validator.isInteger(1), true);
    assert.equal(validator.isInteger(-1), true);
    assert.equal(validator.isInteger(0), true);
    assert.equal(validator.isInteger(Number.MAX_SAFE_INTEGER), true);
    assert.equal(validator.isInteger(Number.MIN_SAFE_INTEGER), true);
    assert.equal(validator.isInteger(Number.MAX_VALUE), true);
  });

  it('isInteger:not valid', () => {
    assert.equal(validator.isInteger(0.1), false);
    assert.equal(validator.isInteger(-1.1), false);
    assert.equal(validator.isInteger(Number.MIN_VALUE), false);
  });  

  it('isPositiveInteger:valid', () => {
    assert.equal(validator.isPositiveInteger(1), true);
  });

  it('isPositiveInteger:not valid', () => {
    // NOTE: isInteger 검사에서는 성공했으나 isPositiveInteger 에서는 실패
    assert.equal(validator.isPositiveInteger(0), false);
    assert.equal(validator.isPositiveInteger(-1), false);
  });  

  it('isTelephone', () => {
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
    assert.equal(validator.isTelephone(() => ({})), false);
    assert.equal(validator.isTelephone('12345678'), true);
    assert.equal(validator.isTelephone('123456789012'), true);
  });

  it('isCellPhone', () => {
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
    assert.equal(validator.isCellPhone(() => ({})), false);
    assert.equal(validator.isCellPhone('0987654321'), true);
    assert.equal(validator.isCellPhone('09876543210'), true);
  });

  it('isEmail', () => {
    assert.equal(validator.isEmail(''), false);
    assert.equal(validator.isEmail(null), false);
    assert.equal(validator.isEmail(undefined), false);
    assert.equal(validator.isEmail({}), false);
    assert.equal(validator.isEmail([]), false);
    assert.equal(validator.isEmail(Symbol()), false);
    assert.equal(validator.isEmail(NaN), false);
    assert.equal(validator.isEmail(0), false);
    assert.equal(validator.isEmail(1.1), false);
    assert.equal(validator.isEmail(-1), false);
    assert.equal(validator.isEmail(Number.MIN_VALUE), false);
    assert.equal(validator.isEmail(Number.MAX_VALUE), false);
    assert.equal(validator.isEmail(() => ({})), false);
    assert.equal(validator.isEmail('1234567890'), false);
    assert.equal(validator.isEmail('가나다'), false);
    assert.equal(validator.isEmail('abc'), false);
    assert.equal(validator.isEmail('harry1993@'), false);
    assert.equal(validator.isEmail('harry1993@gmail'), false);
    assert.equal(validator.isEmail('harry1993@gmail.c'), false);
    assert.equal(validator.isEmail('harry1993@gmail.co'), true);
    assert.equal(validator.isEmail('harry1993@gmail.com'), true);
  });

  it('isUUID', () => {
    assert.equal(validator.isUUID(''), false);
    assert.equal(validator.isUUID(null), false);
    assert.equal(validator.isUUID(undefined), false);
    assert.equal(validator.isUUID({}), false);
    assert.equal(validator.isUUID([]), false);
    assert.equal(validator.isUUID(Symbol()), false);
    assert.equal(validator.isUUID(NaN), false);
    assert.equal(validator.isUUID(0), false);
    assert.equal(validator.isUUID(1.1), false);
    assert.equal(validator.isUUID(-1), false);
    assert.equal(validator.isUUID(Number.MIN_VALUE), false);
    assert.equal(validator.isUUID(Number.MAX_VALUE), false);
    assert.equal(validator.isUUID(() => ({})), false);
    assert.equal(validator.isUUID('1234567890'), false);
    assert.equal(validator.isUUID('가나다'), false);
    assert.equal(validator.isUUID('abc'), false);
    assert.equal(validator.isUUID('harry1993@gmail.com'), false);
    assert.equal(validator.isUUID('20f8d123-bdf5'), false);
    assert.equal(validator.isUUID('20f8d123-bdf5-4b83'), false);
    assert.equal(validator.isUUID('20f8d123-bdf5-4b83-aa17'), false);
    assert.equal(validator.isUUID('20f8d123-bdf5-4b83-aa17-b2b04ebe1d0a'), true);
  });

  it('isBoolean', () => {
    assert.equal(validator.isBoolean(''), false);
    assert.equal(validator.isBoolean(null), false);
    assert.equal(validator.isBoolean(undefined), false);
    assert.equal(validator.isBoolean({}), false);
    assert.equal(validator.isBoolean([]), false);
    assert.equal(validator.isBoolean(Symbol()), false);
    assert.equal(validator.isBoolean(NaN), false);
    assert.equal(validator.isBoolean(0), false);
    assert.equal(validator.isBoolean(1.1), false);
    assert.equal(validator.isBoolean(-1), false);
    assert.equal(validator.isBoolean(1), false);
    assert.equal(validator.isBoolean('true'), false);
    assert.equal(validator.isBoolean('false'), false);    
    assert.equal(validator.isBoolean(Number.MIN_VALUE), false);
    assert.equal(validator.isBoolean(Number.MAX_VALUE), false);
    assert.equal(validator.isBoolean('가나다'), false);
    assert.equal(validator.isBoolean(() => ({})), false);
    assert.equal(validator.isBoolean(true), true);
    assert.equal(validator.isBoolean(false), true);
  });
});

describe('bRules', () => {
  it('required', () => {
    assert.equal(bRules.required()(null), false);
    assert.equal(bRules.required()(undefined), false);
    assert.equal(bRules.required()(''), false);
    assert.equal(bRules.required()(0), true);
    assert.equal(bRules.required()({}), true);
    assert.equal(bRules.required()([]), false);
    assert.equal(bRules.required()(Symbol()), true);
    assert.equal(bRules.required()(123), true);
    assert.equal(bRules.required()('123'), true);
    assert.equal(bRules.required()(() => ({})), true);
    assert.equal(bRules.required()(NaN), false);
  });

  it('businessNumber', () => {
    assert.equal(bRules.businessNumber()(null), false);
    assert.equal(bRules.businessNumber()(undefined), false);
    assert.equal(bRules.businessNumber()(''), false);
    assert.equal(bRules.businessNumber()(0), false);
    assert.equal(bRules.businessNumber()({}), false);
    assert.equal(bRules.businessNumber()(123456789), false);
    assert.equal(bRules.businessNumber()(1234567890), true);
  });

  it('tel', () => {
    assert.equal(bRules.tel()('1234567890123'), false);
    assert.equal(bRules.tel()('1234'), false);
    assert.equal(bRules.tel()('abc'), false);
    assert.equal(bRules.tel()('abc1234567890'), false);
    assert.equal(bRules.tel()('abc12345'), false);
    assert.equal(bRules.tel()('가나다'), false);
    assert.equal(bRules.tel()('가나다1234567890'), false);
    assert.equal(bRules.tel()('가나다12345'), false);
    assert.equal(bRules.tel()(''), false);
    assert.equal(bRules.tel()(null), false);
    assert.equal(bRules.tel()(undefined), false);
    assert.equal(bRules.tel()(12345678), false);
    assert.equal(bRules.tel()(() => ({})), false);
    assert.equal(bRules.tel()('12345678'), true);
    assert.equal(bRules.tel()('123456789012'), true);    
  });
  
  it('cellPhone', () => {
    assert.equal(bRules.cellPhone()('098765432101'), false);
    assert.equal(bRules.cellPhone()('098765432'), false);
    assert.equal(bRules.cellPhone()('abc'), false);
    assert.equal(bRules.cellPhone()('abc0987654'), false);
    assert.equal(bRules.cellPhone()('abc09876'), false);
    assert.equal(bRules.cellPhone()('가나다'), false);
    assert.equal(bRules.cellPhone()('가나다0987654'), false);
    assert.equal(bRules.cellPhone()('가나다09876'), false);
    assert.equal(bRules.cellPhone()(''), false);
    assert.equal(bRules.cellPhone()(null), false);
    assert.equal(bRules.cellPhone()(undefined), false);
    assert.equal(bRules.cellPhone()(12345678), false);
    assert.equal(bRules.cellPhone()(() => ({})), false);
    assert.equal(bRules.cellPhone()('0987654321'), true);
    assert.equal(bRules.cellPhone()('09876543210'), true);
  });
});