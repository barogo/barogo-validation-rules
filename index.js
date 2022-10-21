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
      return (!essentials.isEmptyString()(v) && !Number.isNaN(number)) || msg;
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
}

const REGEXP = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{10,}$/,
  PASSWORD_ALLOWED_TEXT: /^[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{0,}$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  LOGIN_ID: /^[\w-@._]{4,}$/,
  TEL: /^\d{8,12}$/,
  PHONE: /^\d{10,11}$/,
};

export const bRules = Object.assign({
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
    return ((v) => REGEXP.PASSWORD.test(v).test(v) || msg);
  },
  tel(msg = false) {
    return ((v) => REGEXP.TEL.test(v) || msg);
  },
  phone(msg = false) {
    return ((v) => REGEXP.PHONE.test(v) || msg);
  },
}, essentials);
