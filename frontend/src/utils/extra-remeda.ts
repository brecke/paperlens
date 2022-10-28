import * as R from 'remeda';

function appendString(after: string): (arg0: string) => string {
	return function (before: string): string {
		return `${before}${after}`;
	};
}

function defaultToEmptyString(x: string) {
	return x || '';
}

function containsNumbers(charSequence: string) {
	return /\d/.test(charSequence);
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
	appendString,
	defaultToEmptyString,
	isEmptyArray,
	isNotEmptyArray,
	isEmptyString,
	isNotEmptyString,
};