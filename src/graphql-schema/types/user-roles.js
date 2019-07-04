'use strict'

import { GraphQLEnumType } from 'graphql'

export default new GraphQLEnumType({
  name: 'userRoles',
  values: {
    ADMIN: { value: 'admin' },
    TELLER: { value: 'teller' },
    CUSTOMER: { value: 'customer' }
  }
})
