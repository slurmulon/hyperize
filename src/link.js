'use strict'

// http://json-schema.org/latest/json-schema-hypermedia.html#anchor17

import {is, isString, isArray, mix} from './util'

import {Schema} from './schema'
import {Resource} from './resource'
import {URI} from 'urijs'

export let service = Resource

export class LinkSchema {

  constructor({rel, schema, data}) { // TODO - maybe Resource instead of rel
    this.rel    = rel
    this.data   = data
    this.schema = schema
  }

  get data() {
    return this._data || {}
  }

  set data(data: Object) {
    this._data = data  
  }

  get rel() {
    return this._rel
  }

  set rel(rel: String) {
    this._rel = rel
  }

  get href() {
    return this._href
  }

  set href(uri: String) {
    this._href = URI(uri)
  }

  get title() {
    return this.data.title
  }

  set title(title: String) {
    mix(this.data, {title})
  }

  get schema() {
    return this.data.$schema
  }

  set schema(schema) {
    this.data.$schema = schema
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

  isActive(): Boolean {
    return true // TODO
  }

  is(rel): Boolean {
    return this.rel === rel
  }

  follow(): Promise {
    if (!service || !service.request instanceof Function) {
      throw 'invalid interface for service, must define "request" method'
    }

    return service.request(this.href)
  }

}
