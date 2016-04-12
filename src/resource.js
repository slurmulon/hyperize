'use strict'

import {Rel} from './rel'
import URI from 'urijs'

export const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'LINK']

export class Resource {

  constructor(rel: Rel, url: URI, service: Function, onSuccess: Function, onFailure: Function) {
    this.rel       = rel
    this.url       = url
    this.service   = service   || (_ => _) // ? - {} instead?
    this.onSuccess = onSuccess || (_ => _)
    this.onFailure = onFailure || (_ => _)
  }

  request(method: String, body: Object): Promise {
    return Promise((resolve, reject) => {
      let response = this.service.call(method, body)

      if (!is(response, undefined)) {
        resolve(
          onSuccess(response)
        )
      } else {
        reject(
          onFailure(response)
        )
      }
    })
  }

}