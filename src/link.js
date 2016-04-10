'use strict'

// http://json-schema.org/latest/json-schema-hypermedia.html#anchor17

import {is, isString, isArray, mix} from './util'

import {Resource} from './resource'
import {URI} from 'urijs'

export let service = Resource

export class LinkSchema {

  constructor(rel, schema, data) { // TODO - maybe HyperResource instead of rel
    this.rel  = rel
    this.data = data
    this.schema = schema
  }

  get data() {
    return this._data || {}
  }

  set data(data) {
    if (data instanceof Object) {
      this._data = data  
    }
  }

  get rel() {
    return this._rel
  }

  set rel(rel) {
    if (isString(rel)) { // TODO - stricter validation based on standard
      this._rel = rel
    }
  }

  get href() {
    return this._href
  }

  set href(uri) {
    this._href = URI(uri)
  }

  get title() {
    return this.data.title
  }

  set title(title) {
    if (isString(rel)) {
      mix(this.data, {title})
    }
  }

  get schema() {
    return this.data.$schema
  }

  set schema(schema) {
    this._schema = schema
  }

  get targetSchema() {
    return this.data.targetSchema
  }

  get method() {
    return this.data.method
  }

  get mediaType() {
    return this.data.mediaType
  }

  follow() {

  }

  isActive() {

  }

  is(rel) {
    return this.rel === rel
  }

}
