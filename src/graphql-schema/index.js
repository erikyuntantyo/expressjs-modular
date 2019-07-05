'use strict'

import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { GraphQLAccountMutations, GraphQLAuthMutations, GraphQLBankMutations, GraphQLTransactionMutations, GraphQLUserMutations } from './mutations'
import { GraphQLAccountQueries, GraphQLBankQueries, GraphQLTransactionQueries, GraphQLUserQueries } from './queries'

const query = new GraphQLObjectType({
  name: 'query',
  fields: {
    ...GraphQLAccountQueries,
    ...GraphQLBankQueries,
    ...GraphQLTransactionQueries,
    ...GraphQLUserQueries
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    ...GraphQLAccountMutations,
    ...GraphQLAuthMutations,
    ...GraphQLBankMutations,
    ...GraphQLTransactionMutations,
    ...GraphQLUserMutations
  }
})

export default new GraphQLSchema({ query, mutation })
