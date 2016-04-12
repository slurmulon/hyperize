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

  constructor({key = Symbol(), data, parent}) {
    this.key    = key
    this.data   = data
    this.parent = parent

    if (!this.data.$schema) {
      this.data.$schema = draft
    }

    if (this.validate(data)) {
      if (key)
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
    return this.links().find(link => is(link.rel, 'self'))
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

  get expanded() {
    // dynamically follow rels to other schemas, then denormalize
  }

  extend(data: Object) {
    this.data = Object.assign({}, this.data, data)
  }

  hasDefault() {
    return !!this.data.default
  }

  defaultValue() {
    return this.data.default
  }

  propertySchemas() {
    return this.data.dependencies
  }

  propertyDependencies() {

  }

  minProperties() {
    return this.data.minProperties
  }

  maxProperties() {
    return this.data.maxProperties
  }

  requiredProperties() {
    return this.properties.filter((prop, key) => this.required.includes(key))
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
    return (this.data.links || []).map(link => new LinkSchema({data: link}))
  }

  link(rel: String) {
    return this.links().filter(link => link.rel === rel)
  }

  isReadOnly() {
    return this.data.readOnly
  }

  pattern() {
    return new RegExp(this.patternString())
  }

  patternString() {
    return this.data.pattern
  }

  asList() {
    return [this]
  }

  propose(schema: Object) {
    // validates a proposed schema
    if (this.validate(schema))
  }

  validate(data: Object) {
    return validate(data, this.data)
  }

  equals(other: Schema) {
    return is(this, other)
  }

  toString() {

  }

  static fetch(url: String) {
    // resource.request(url)
  }

  static add() {

  }

  static remove() {

  }

  static ized(data) { // TODO - parent?
    if (data instanceof Schema || isString(data) || isBool(data)) {
      return data
    }

    if (data instanceof Array) {
      return data.map(Schema.ized)
    }

    if (data instanceof Object) {
      Object.keys(data, (key) => {
        data[key] = Schema.ized(data)
      })
    }

    return new Schema({data})
  }

}

export default {HyperSchema}
