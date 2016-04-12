'use strict'

/**
 * More convenient object comparison
 */
export const is = (x, y) => x === y || Object.is(x, y)

/**
 * Convenient type check for String
 */
export const isString = (x) => x ? is(x.constructor, String) : false

/**
 * Convenient type check for Array
 */
export const isArray = (x) => x ? is(x.constructor, Array) : false

/**
 * Convenient type check for Boolean
 */
export const isBool = (x) => x === true || x === false

/**
 * Determines if an object is falsy or an empty array
 */
export const isEmpty = (x) => !x || Object.keys(x).length === 0

/**
 * Safely merges together N objects (leaves source objects untouched)
 */
export const mix = () => Object.assign({}, ...arguments)

/**
 * Object.entries "polyfill"
 */
export const entries = (obj) => Object.keys(obj).map((key) => [key, obj[key]])

/**
 * Object.values "polyfill"
 */
export const values = (obj) => Object.keys(obj).map((key) => obj[key])

/**
 * Default module export
 */
export default { is, isString, isArray, isBool, isEmpty, mix, entries, values }