'use strict '

import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export default new GraphQLObjectType({
  name: 'banks',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    code: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})
