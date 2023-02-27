export type ValidationResult = string | boolean;
export type ValidationFunction = (value: any) => ValidationResult;

export declare const validator: {
  isNumber: (value: any) => boolean;
  isFloat: (value: any) => boolean;
  isinteger: (value: any) => boolean;
  isPositiveInteger: (value: any) => boolean;
  isString: (value: any) => boolean;
  isTelephone: (value: any) => boolean;
  isCellPhone: (value: any) => boolean;
  isEmail: (value: any) => boolean;
  isUUID: (value: any) => boolean;
  isBoolean: (value: any) => boolean;
};

interface IEssentials {
  lengthEqual: (length: number, msg?: ValidationResult) => ValidationFunction;
  lengthLess: (length: number, msg?: ValidationResult) => ValidationFunction;
  lengthLessEqual: (length: number, msg?: ValidationResult) => ValidationFunction;
  lengthGreater: (length: number, msg?: ValidationResult) => ValidationFunction;
  lengthGreaterEqual: (length: number, msg?: ValidationResult) => ValidationFunction;
  lengthBetween: (min: number, max: number, msg?: ValidationResult) => ValidationFunction;
  lengthBetweenInclude: (min: number, max: number, msg?: ValidationResult) => ValidationFunction;
  betweenNumber: (min: number, max: number, msg?: ValidationResult) => ValidationFunction;
  betweenIncludeNumber: (min: number, max: number, msg?: ValidationResult) => ValidationFunction;
  isNumber: (msg?: ValidationResult) => ValidationFunction;
  isEmptyString: (msg?: ValidationResult) => ValidationFunction;
  isEmptyArray(msg?: ValidationResult): ValidationFunction;
  isNull: (msg?: ValidationResult) => ValidationFunction;
  notNull: (msg?: ValidationResult) => ValidationFunction;
}

interface IbRules extends IEssentials {
  required: (msg?: ValidationResult) => ValidationFunction;
  businessNumber: (msg?: ValidationResult) => ValidationFunction;
  email: (msg?: ValidationResult) => ValidationFunction;
  loginId: (msg?: ValidationResult) => ValidationFunction;
  passwordCharacter: (msg?: ValidationResult) => ValidationFunction;
  password: (msg?: ValidationResult) => ValidationFunction;
  tel: (msg?: ValidationResult) => ValidationFunction;
  cellPhone: (msg?: ValidationResult) => ValidationFunction;
}

export declare const bRules: IbRules;
