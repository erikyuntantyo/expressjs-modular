'use strict'

import { hashPassword } from '../../hooks'

export default {
  before: {
    all: [],
    get: [],
    find: [],
    create: [hashPassword],
    update: [],
    delete: []
  },
  after: {
    all: [],
    get: [],
    find: [],
    create: [],
    update: [],
    delete: []
  }
}
