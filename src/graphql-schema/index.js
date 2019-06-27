'use strict'

import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { GraphQLBankMutations, GraphQLUserMutations } from './mutations'
import { GraphQLAccountQueries, GraphQLBankQueries, GraphQLUserQueries } from './queries'

const mutationFields = () => ({
  ...GraphQLBankMutations,
  ...GraphQLUserMutations
})

console.log('test', mutationFields)

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
    ...GraphQLBankMutations,
    ...GraphQLUserMutations
  }
})

export default new GraphQLSchema({ query, mutation })
