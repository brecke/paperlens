import * as R from "remeda";
import { allPass } from "remeda";

function defaultToEmptyString(x: string) {
  return x || "";
}

function containsNumbers(charSequence: string) {
  return /[0-9]/.test(charSequence);
}

function lengthOf(someArray: [] | string) {
  return someArray.length;
}

function isEmptyArray(someArray: []) {
  return R.isArray(someArray) && R.equals(0, lengthOf(someArray));
}

function isNotEmptyArray(someArray: []) {
  return !isEmptyArray(someArray);
}

function isEmptyString(someString: string) {
  return R.isString(someString) && R.equals(0, lengthOf(someString));
}

function isNotEmptyString(someString: string) {
  return !isEmptyString(someString);
}

export {
  containsNumbers,
  defaultToEmptyString,
  isEmptyArray,
  isNotEmptyArray,
  isEmptyString,
  isNotEmptyString,
};
