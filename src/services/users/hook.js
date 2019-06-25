'use strict'

import { authentication, hashPassword, hidePassword } from '../../hooks'

export default {
  before: {
    all: [],
    get: [authentication],
    find: [authentication],
    create: [hashPassword],
    update: [authentication, hashPassword],
    delete: [authentication]
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
