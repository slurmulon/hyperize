'use strict'

import {Rel} from './rel'
import URI from 'urijs'

export const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'LINK']

export class Resource {

  constructor(rel: Rel, url: URI, service: Function) {
    this.rel     = rel
    this.url     = url
    this.service = service || () => ({})
  }

  request(method: String, body: Object) {
    return this.service.call(method, body)
  }

}