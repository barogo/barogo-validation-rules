const REGEXP = {
  // TODO 각 정규표현식에서 검사하는 조건을 주석으로 표현하는 것이 좋겠습니다. 
  // 개발자 뿐만이 아닌 기획에서도 이 규칙을 확인할 필요가 있기 때문입니다.
  // 그리고 개발자더라도 정규표현식이 길어지면 이해하기 조금 어려운 부분이 있네요.
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/,
  PASSWORD_ALLOWED_TEXT: /^[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  LOGIN_ID: /^[\w-@._]{4,}$/,
  TEL: /^\d{8,12}$/,
  PHONE: /^\d{10,11}$/,
  CELL_PHONE: /^\d{10,11}$/,
  // https://www.postgresql.org/docs/9.1/datatype-uuid.html
  // https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};
// NOTE: validator 내부에서 자체 메서드를 참조하는 경우는 명확한 사유가 있어야 합니다.
// 상호참조 및 의존성 관리를 위해서 내부 메서드 참조를 제한해야 합니다.
export const validator = {
  // TODO null과 undefined는 분리되어야 하지 않을까?
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
   * 유효한 실수(float) 타입인지 확인합니다.
   * 주의: 실수는 숫자의 부분집합이므로 isFloat 메서드를 참조합니다.
   * NOTE: epsilon은 1과 1보다 큰 최소 실수값의 차를 의미. 그러므로 epsilon은 실수.
   *
   * @param {number} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 정수(Integer) 여부
   */
  isFloat(v) {
    if (!this.isNumber(v) || 
        v === Number.NEGATIVE_INFINITY ||
        v === Number.POSITIVE_INFINITY) {
      return false;
    }
    return true;
  },
  /**
   * 유효한 정수(integer) 타입인지 확인합니다.
   * 주의: 정수는 실수의 부분집합이므로 isFloat 메서드를 참조합니다.
   *
   * @param {number} v - 검사할 값
   *
   * @return {boolean} 검사할 값의 정수(integer) 여부
   */
  isInteger(v) {
    if (!this.isFloat(v)) {
      return false;
    }
    return parseInt(v, 10) === v;
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

const essentials = {
  lengthEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length == length || msg;
      return String(v).trim().length == length || msg;
    });
  },
  lengthLess(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;
      if (Array.isArray(v)) return v.length < length || msg;
      return String(v).trim().length < length || msg;
    });
  },
  lengthLessEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length <= length || msg;
      return String(v).trim().length <= length || msg;
    });
  },
  lengthGreater(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;
      if (Array.isArray(v)) return v.length > length || msg;
      return String(v).trim().length > length || msg;
    });
  },
  lengthGreaterEqual(length, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return length == 0 || msg;
      if (Array.isArray(v)) return v.length >= length || msg;
      return String(v).trim().length >= length || msg;
    });
  },
  lengthBetween(min, max, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;

      let length;
      if (Array.isArray(v)) length = v.length;
      else length = String(v).trim().length;
      return (length > min && length < max) || msg;
    });
  },
  lengthBetweenInclude(min, max, msg = false) {
    return ((v) => {
      if (essentials.isNull()(v)) return msg;

      let length;
      if (Array.isArray(v)) length = v.length;
      else length = String(v).trim().length;
      return (length >= min && length <= max) || msg;
    });
  },
  betweenNumber(min, max, msg = false) {
    return ((v) => {
      const number = Number(v);
      return essentials.isNumber()(v) &&  (number > min && number < max) || msg;
    });
  },
  betweenIncludeNumber(min, max, msg = false) {
    return ((v) => {
      const number = Number(v);
      return essentials.isNumber()(v) && (number >= min && number <= max) || msg;
    });
  },
  isNumber(msg = false) {
    return ((v) => {
      const number = Number(v);
      return validator.isNumber(v) || msg;
    });
  },
  isEmptyString(msg = false) {
    return ((v) => String(v).trim() === '' || msg);
  },
  isNull(msg = false) {
    return ((v) => (v === undefined || v === null) || msg);
  },
  notNull(msg = false) {
    return ((v) => !essentials.isNull()(v) || msg); 
  }
};

export const bRules = Object.assign({ // TODO rules, utils로 일반적인 이름으로 가는 것이 좋겠다.
  required(msg = false) {
    return ((v) => !essentials.isNull()(v) && !essentials.isEmptyString()(v) || msg);
  },
  businessNumber(msg = false) {
    return ((v) => essentials.isNumber()(v) && essentials.lengthEqual(10)(v) || msg);
  },
  email(msg = false) {
    return ((v) => validator.isEmail(v) || msg);
  },
  loginId(msg = false) {
    return ((v) => REGEXP.LOGIN_ID.test(v) || msg);
  },
  passwordCharacter(msg = false) {
    return ((v) => REGEXP.PASSWORD_ALLOWED_TEXT.test(v) || msg);
  },
  password(msg = false) {
    return ((v) => REGEXP.PASSWORD.test(v) || msg);
  },
  tel(msg = false) {
    return ((v) => validator.isTelephone(v) || msg);
  },
  // FIX ME - tel과 phone이 의미가 비슷하게 보이는 부분이 있습니다. cellPhone으로 명확하게 하면 어떨지용?
  phone(msg = false) {
    return ((v) => validator.isCellPhone(v) || msg);
  },
  cellPhone(msg = false) {
    return ((v) => validator.isCellPhone(v) || msg);
  },  
}, essentials);
