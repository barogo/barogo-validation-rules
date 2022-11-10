const REGEXP = {
  // TODO 각 정규표현식에서 검사하는 조건을 주석으로 표현하는 것이 좋겠습니다. 
  // 개발자 뿐만이 아닌 기획에서도 이 규칙을 확인할 필요가 있기 때문입니다.
  // 그리고 개발자더라도 정규표현식이 길어지면 이해하기 조금 어려운 부분이 있네요.
  /**
   * PASSWORD 정규표현식 해석
   * 
   * 1. (?=.*[a-z]) // 최소 1개 이상의 영소문자
   * 2. (?=.*[A-Z]) // 최소 1개 이상의 영대문자
   * 3. (?=.*\d) // 최소 1개 이상의 숫자
   * 4-1. (?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]) // 최소 1개 이상의 특수문자
   * 4-2. !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ // 특수문자 중 허용문자
   * 5. [A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,} // 1, 2, 3, 4의 조합으로 10글자 이상
   */
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/,
  /**
   * PASSWORD_ALLOWED_TEXT 정규표현식 해석
   * 
   * 1. !"#$%&'()*+,-./:;<=>?@[]^_`{|}~ // 빈값 혹은, 영문 소문자, 대문자, 숫자, 허용 특수문자만 가능
   */
  PASSWORD_ALLOWED_TEXT: /^[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  /**
   * LOGIN_ID 정규표현식 해석
   * 
   * 1. 영소문자, 영대문자, 숫자, 특수문자 -@._ 포함 4자 이상
   */
  LOGIN_ID: /^[\w-@._]{4,}$/,
  TEL: /^\d{8,12}$/,
  CELL_PHONE: /^\d{10,11}$/,
  // https://www.postgresql.org/docs/9.1/datatype-uuid.html
  // https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
  /**
   * UUID 정규표현식 해석
   * 
   * 1. 숫자와 알파벳 대,소문자 조합으로 8자리, 4자리 등의 순서로 조합
   */  
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};
// NOTE: validator 내부에서 자체 메서드를 참조하는 경우는 명확한 사유가 있어야 합니다.
// 상호참조 및 의존성 관리를 위해서 내부 메서드 참조를 제한해야 합니다.
export const validator = {
  /**
   * 유효한 number 타입인지 확인합니다.
   * 정수(integer)와 실수(float), 무한(Infinity)은 유효합니다.
   * 주의: 이 메서드는 다른 validator의 메서드를 참조하지 않는 atomic 메서드입니다.
   *
   * @param {number} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 number 타입 여부
   */
  isNumber(v) {
    if (v === undefined ||
        v === null ||
        typeof v === 'string' ||
        typeof v === 'object' ||
        typeof v === 'symbol' ||
        Array.isArray(v) || 
        Number.isNaN(v)) {
      return false;
    }
    return typeof v === 'number';
  },
  /**
   * Float(부동소수점) 여부를 판단합니다. 아래 방식을 참고했습니다.
   * https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer/3886106#3886106
   * 
   * @param {number} v - 검사할 값
   * 
   * @return {boolean} 검사할 값의 Float(부동소수점) 여부
   */
  isFloat(v) {
    if (!this.isNumber(v) || 
        v === Number.NEGATIVE_INFINITY || 
        v === Number.POSITIVE_INFINITY) {
      return false;
    }
    return v % 1 !== 0;
  },  
  /**
   * 유효한 정수(integer) 타입인지 확인합니다.
   * 주의: 정수와 실수는 다른 개념입니다. 그러므로 정수 검사에서는 숫자 여부만을 먼저 판단합니다.
   * https://www.techopedia.com/definition/23980/float-computer-science
   *
   * @param {number} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 정수(integer) 여부
   */
  isInteger(v) {
    if (!this.isNumber(v) || 
        v === Number.NEGATIVE_INFINITY ||
        v === Number.POSITIVE_INFINITY) {
      return false;
    }
    return v % 1 === 0;
  },
  /**
   * 유효한 양의 정수(positive integer) 타입인지 확인합니다.
   * 주의: 양의 정수는 정수의 부분집합이므로 isInteger 메서드를 참조합니다.
   * 용도: Entity의 숫자형 id 검사
   *
   * @param {number} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 유효한 양의 정수(positive integer) 타입
   */
  isPositiveInteger(v) {
    if (!this.isInteger(v)) {
      return false;
    }
    return v > 0;
  },
  /**
   * 유효한 문자열(string) 타입인지 확인합니다.
   * (기본)공백 문자열도 유효한 것으로 판단합니다.
   * 주의: 이 메서드는 다른 validator의 메서드를 참조하지 않는 atomic 메서드입니다.
   *
   * @param {string} v - 검사할 값
   * @param {number} minLength - 유효하다고 판단하는 문자열의 최소길이. 기본값은 0.
   *
   * @return {boolean} 검사할 값의 유효한 문자열(string) 여부
   */
  isString(v, minLength = 0) {
    return typeof v === 'string' && v.length >= minLength;
  },
  /**
   * 유효한 문자열(string):유선 전화번호(대한민국) 타입인지 확인합니다.
   *
   * @param {string} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 문자열(string):유선 전화번호(대한민국) 타입 여부
   */
  isTelephone(v) {
    return this.isString(v) && REGEXP.TEL.test(v);
  },
  /**
   * 유효한 문자열(string):휴대 전화번호(대한민국) 타입인지 확인합니다.
   *
   * @param {string} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 문자열(string):휴대 전화번호(대한민국) 타입 여부
   */
  isCellPhone(v) {
    return this.isString(v) && REGEXP.CELL_PHONE.test(v);
  },
  /**
   * 유효한 문자열(string):이메일 타입인지 확인합니다.
   *
   * @param {string} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 문자열(string):이메일 타입 여부
   */
  isEmail(v) {
    return this.isString(v) && REGEXP.EMAIL.test(v);
  },
  /**
   * 유효한 문자열(string):UUID 타입인지 확인합니다.
   *
   * @param {string} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 문자열(string):UUID 타입 여부
   */
  isUUID(v) {
    return this.isString(v) && REGEXP.UUID.test(v);
  },
  /**
   * 검사할 값이 Boolean 타입인지 확인합니다.
   *
   * @param {string} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 Boolean 타입 여부
   */
  isBoolean(v) {
    return typeof v === 'boolean';
  }
};

// TODO 
// essentials 안에서의 상호참조는 하지 않는 것이 더 좋을 것 같습니다. 
// 만약 여러 차례의 상호참조가 발생하는 구조가 만들어진다면 
// 이를 유지보수하기가 쉽지 않을 것입니다.
const essentials = {
  lengthEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length == length || msg;
      return String(v).trim().length == length || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthLess(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;
      if (Array.isArray(v)) return v.length < length || msg;
      return String(v).trim().length < length || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthLessEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length <= length || msg;
      return String(v).trim().length <= length || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthGreater(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;
      if (Array.isArray(v)) return v.length > length || msg;
      return String(v).trim().length > length || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthGreaterEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length >= length || msg;
      return String(v).trim().length >= length || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthBetween(min, max, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;

      let length;
      if (Array.isArray(v)) length = v.length;
      else length = String(v).trim().length;
      return (length > min && length < max) || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  lengthBetweenInclude(min, max, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;

      let length;
      if (Array.isArray(v)) length = v.length;
      else length = String(v).trim().length;
      return (length >= min && length <= max) || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  betweenNumber(min, max, msg = false) {
    return ((v) => {
      const number = Number(v);
      return essentials.isNumber()(v) &&  (number > min && number < max) || msg;
    });
  },
  // TODO 사용하는 곳이 없다면 나중에 삭제하기
  betweenIncludeNumber(min, max, msg = false) {
    return ((v) => {
      const number = Number(v);
      return essentials.isNumber()(v) && (number >= min && number <= max) || msg;
    });
  },
  isNumber(msg = false) {
    return ((v) => {
      return validator.isNumber(v) || msg;
    });
  },
  isEmptyString(msg = false) {
    return ((v) => String(v).trim() === '' || msg);
  },
  // NOTE: isNull을 null과 undefined를 동시에 판단하는 것으로 컨벤션을 정함.
  isNull(msg = false) {
    return ((v) => (v === undefined || v === null) || msg);
  },
  notNull(msg = false) {
    return ((v) => !essentials.isNull()(v) || msg); 
  }
};

export const bRules = Object.assign({
  /**
   * 유효한 값인지 여부를 검사하는 메서드를 반한합니다.
   * 유효하지 않은 값은 null, undefeind, ''(공백문자열) 입니다.
   * 주의: 0은 유효한 값으로 인정합니다.
   *
   * @param {string|boolean} msg - 유효하지 않을 경우, 반환할 문자열(string) 값 또는 불린(boolean) 값
   *
   * @return {function} 유효한 값인지 여부를 검사하는 메서드
   */
  required(msg = false) {
    return ((v) => !essentials.isNull()(v) && !essentials.isEmptyString()(v) || msg);
  },
  /**
   * 유효한 사업자번호 여부를 검사하는 메서드를 반한합니다.
   *
   * @param {string|boolean} msg - 유효하지 않을 경우, 반환할 문자열(string) 값 또는 불린(boolean) 값
   *
   * @return {function} 유효한 사업자번호 여부를 검사하는 메서드
   */
  businessNumber(msg = false) {
    // TODO 좀 더 상세한 사업자번호 규칙이 있지 않을까?
    return ((v) => essentials.isNumber()(v) && essentials.lengthEqual(10)(v) || msg);
  },
  /**
   * 유효한 email 여부를 검사하는 메서드를 반한합니다.
   *
   * @param {string|boolean} msg - 유효하지 않을 경우, 반환할 문자열(string) 값 또는 불린(boolean) 값
   *
   * @return {function} 유효한 email 여부를 검사하는 메서드
   */
  email(msg = false) {
    return ((v) => validator.isEmail(v) || msg);
  },
  // FIX ME: 서비스마다 loginId에 대한 규칙은 다를 것 같습니다. 논의 필요할 듯 합니다.
  loginId(msg = false) {
    return ((v) => REGEXP.LOGIN_ID.test(v) || msg);
  },
  // FIX ME: 서비스마다 password에 대한 규칙은 다를 것 같습니다. 논의 필요할 듯 합니다.
  // TODO password의 필요조건을 모듈화해서 조합해서 사용하기
  passwordCharacter(msg = false) {
    return ((v) => REGEXP.PASSWORD_ALLOWED_TEXT.test(v) || msg);
  },
  // FIX ME: 서비스마다 password에 대한 규칙은 다를 것 같습니다. 논의 필요할 듯 합니다.
  password(msg = false) {
    return ((v) => REGEXP.PASSWORD.test(v) || msg);
  },
  /**
   * 유효한 전화번호 여부를 검사하는 메서드를 반한합니다.
   *
   * @param {string|boolean} msg - 유효하지 않을 경우, 반환할 문자열(string) 값 또는 불린(boolean) 값
   *
   * @return {function} 유효한 전화번호 여부를 검사하는 메서드
   */
  tel(msg = false) {
    return ((v) => validator.isTelephone(v) || msg);
  },
  cellPhone(msg = false) {
    return ((v) => validator.isCellPhone(v) || msg);
  },  
}, essentials);
