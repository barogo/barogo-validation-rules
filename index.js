const REGEXP = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/,
  PASSWORD_ALLOWED_TEXT: /^[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  LOGIN_ID: /^[\w-@._]{4,}$/,
  TEL: /^\d{8,12}$/,
  PHONE: /^\d{10,11}$/,
  CELL_PHONE: /^\d{10,11}$/,
};

export const validator = {
  // TODO null과 undefined는 분리되어야 하지 않을까?
  // TODO 서비스에서 주로 사용하는 숫자 범위는 정수(integer)와 실수(float). 무한(Infinity)은 포함되지 않는다.
  isNumber(v) {
    if (v === undefined ||
        v === null ||
        typeof v === 'string' ||
        typeof v === 'object' ||
        typeof v === 'symbol' ||
        Number.isNaN(v)) {
      return false;
    }
    return typeof v === 'number';
  },
  isInteger(v) {
    if (!this.isNumber(v)) {
      return false;
    }
    return parseInt(v, 10) === v;
  },
  isTelephone(v) {
    return !this.isNumber(v) && typeof v === 'string' && REGEXP.TEL.test(v);
  },
  isCellPhone(v) {
    return !this.isNumber(v) && typeof v === 'string' && REGEXP.CELL_PHONE.test(v);
  },
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
    return ((v) => REGEXP.EMAIL.test(v) || msg);
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
