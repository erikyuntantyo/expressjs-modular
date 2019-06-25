'use strict'

import { authentication } from '../../hooks'

export default {
  before: {
    all: [authentication],
    get: [],
    find: [],
    create: [],
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
