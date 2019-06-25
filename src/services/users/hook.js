'use strict'

import { authentication, hashPassword, hidePassword } from '../../hooks'

export default {
  before: {
    all: [authentication],
    get: [],
    find: [],
    create: [hashPassword],
    update: [hashPassword],
    delete: []
  },
  after: {
    all: [hidePassword],
    get: [],
    find: [],
    create: [],
    update: [],
    delete: []
  }
}
