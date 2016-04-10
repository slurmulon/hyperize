'use strict'

// http://json-schema.org/latest/json-schema-hypermedia.html#anchor8

import {Schema} from './schema'
import {Resource} from './resource'
import {is} from './util'

export const standards = ['json-pointer', 'json-path']

/**
 * Also known as a "Fragment"
 */
export class Rel {

  construtor(name: String, schema: Schema, standard: String = 'json-pointer') {
    this.name     = name
    this.schema   = schema
    this.standard = standard
  }

  get as() {
    return {
      link: {},
      data: {},
      schema: {}
    }
  }

  get resource(): Resource {
    // TODO - allow override
  }

  /**
   * If the relation value is "self", when this property is 
   * encountered in the instance object, the object represents
   * a resource and the instance object is treated as a full 
   * representation of the target resource identified by the specified URI.
   */
  isSelf() {
    return is(this.name, 'self')
  }

  /**
   * This indicates that the target of the link is the full 
   * representation for the instance object. The instance that 
   * contains this link may not be the full representation.
   */
  isFull() {
    return is(this.name, 'full')
  }

  /**
   * This relation indicates that the target of the link SHOULD
   * be treated as the root or the body of the representation for
   * the purposes of user agent interaction or fragment resolution.
   * All other data in the document can be regarded as meta-data 
   * for the document. The URI of this link MUST refer to a location
   * within the instance document, otherwise the link MUST be ignored.
   */
  isRoot() {
    return is(this.name, 'root')
  }

  /**
   * This indicates the target of the link is a schema describing 
   * the instance object. This MAY be used to specifically denote 
   * the schemas of objects within a JSON object hierarchy, 
   * facilitating polymorphic type data structures.
   */
  describedBy() {
    return is(this.name, 'describedBy')
  }

  static from(rel) {

  }

}
