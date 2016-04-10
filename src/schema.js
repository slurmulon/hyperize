'use strict'

// http://json-schema.org/latest/json-schema-core.html
// http://json-schema.org/latest/json-schema-hypermedia.html#anchor5
// http://json-schema.org/latest/json-schema-validation.html

import {validate} from 'jsonschema'
import {is, isString, isArray, isBool} from './util'
import {URI} from 'urijs'

import LinkSchema from './link'

export let schemas = {}

export const draft = 'http://json-schema.org/draft-04/hyper-schema'
export const primitives = ['array', 'boolean', 'integer', 'number', 'null', 'object', 'string']

export class Schema {

  constructor(key: String, data: Object = {}, parent: Schema = null) {
    this.key    = key
    this.data   = data
    this.parent = parent

    if (!this.data.$schema) {
      this.data.$schema = draft
    }

    if (this.validate(data)) {
      schemas[key] = this
    } else {
      throw 'Invalid JSON Schema'
    }
  }

  get draft() {
    return this.data.$schema
  }

  get ref() {
    return this.data.$ref
  }

  get title() {
    return this.data.title
  }

  get properties() {
    return this.data.properties || []
  }

  get additionalProperties() {
    return this.data.additionalProperties
  }

  get patternProperties() {
    return this.data.patternProperties
  }

  get required() {
    return this.data.required || []
  }

  get selfLink() {
    return this.links().find(link => link.rel === 'self')
  }

  get expanded() {
    // dynamically follow rels to other schemas, then denormalize
  }

  get enumData() {
    return this.data.enum
  }

  get minimum() {
    return this.data.minimum
  }

  get exclusiveMinimum() {
    return !!this.data.exclusiveMinimum
  }

  get maximum() {
    return this.data.maximum
  }

  get exclusiveMaximum() {
    return !!this.data.exclusiveMaximum
  }

  get minItems() {
    return this.data.minItems || 0
  }

  get maxItems() {
    return this.data.maxItems
  }

  get minLength() {
    return this.data.minLength || 0
  }

  get maxLength() {
    return this.data.maxLength
  }

  extend(data: Object) {
    this.data = Object.assign({}, this.data, data)
  }

  hasDefault() {
    return !!this.data.default
  }

  defaultValue() {

  }

  propertySchemas() {

  }

  propertyDependencies() {

  }

  isUniqueItems() {
    return !!this.data.uniqueItems
  }

  andSchemas() {
    return Schema.ized(this.data.allOf)
  }

  notSchemas() {
    return Schema.ized(this.data.not)
  }

  orSchemas() {
    return Schema.ized(this.data.anyOf)
  }

  xorSchemas() {
    return Schema.ized(this.data.oneOf)
  }

  links() {
    return (this.data.links || []).map(new LinkSchema)
  }

  link(rel: String) {
    return this.links().filter(link => link.rel === rel)
  }

  isReadOnly() {
    return this.readOnly
  }

  pattern() {
    return new RegExp(this.patternString())
  }

  patternString() {
    return this.data.pattern
  }

  minProperties() {
    return this.data.minProperties
  }

  maxProperties() {
    return this.data.maxProperties
  }

  definedProperties() {

  }

  requiredProperties() {
    return this.properties.filter((prop, key) => this.required.includes(key))
  }

  asList() {
    return [this]
  }

  propose(schema) {
    // validates a proposed schema
  }

  validate(data) {
    // validate proposed object instance against this schema
  }

  equals() {

  }

  toString() {

  }

  static fetch(url) {

  }

  static add() {

  }

  static remove() {

  }

  static ized(data) {
    if (isString(data) || isBool(data)) {
      return data
    }

    if (isArray(data)) {
      return data.map(new Schema)
    }

    return new Schema(data)
  }

}

export class HyperSchemaElem {

  constructor(type, data) {
    this.type = type
    this.data = data
  }

}

export default {HyperSchema}
