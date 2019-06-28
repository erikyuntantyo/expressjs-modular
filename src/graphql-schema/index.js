'use strict'

import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { GraphQLAuthMutations, GraphQLBankMutations, GraphQLUserMutations } from './mutations'
import { GraphQLAccountQueries, GraphQLBankQueries, GraphQLUserQueries } from './queries'

const query = new GraphQLObjectType({
  name: 'query',
  fields: {
    ...GraphQLAccountQueries,
    ...GraphQLBankQueries,
    ...GraphQLUserQueries
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    ...GraphQLAuthMutations,
    ...GraphQLBankMutations,
    ...GraphQLUserMutations
  }
})

export default new GraphQLSchema({ query, mutation })
