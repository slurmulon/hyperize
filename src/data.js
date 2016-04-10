'use strict'

import {Schema} from './schema'

/**
 * Represents an instance object of a JSON Hyper-Schema
 */
export class HyperData {

  construtor(schema, value) {
    this.schema = schema
    this.value = value
  }

  // property(key) {

  // }

  set value(data) {
    if (schema.validate(data)) {
      this._value = data
    }
  }

  get value() {
    return this._value
  }

  get keys() {
    // if root, none
  }

  get key() {
    // if root, none
  }

  get parent() {

  }

  get children() {

  }

  get length() {

  }

  get full() {

  }

  get pointerPath() {

  }

  has(ref) {

  }

  isValid() {

  }

  isFull() {
    return is(this.value.$ref, undefined)
  }

  equals(other) {
    // 3.6.  JSON value equality
    // http://json-schema.org/latest/json-schema-core.html
  }
}