'use strict'

import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import uuidv4 from 'uuidv4'

import CommonHelper from '../../helpers/common'
import { GraphQLBank } from '../types'
import Models from '../../models'

export default {
  createBank: {
    type: GraphQLBank,
    args: {
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, data, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        data.id = uuidv4()
        return await Models.getModels().banks.create(data)
      } catch (err) {
        throw err
      }
    }
  },
  disableBank: {
    type: GraphQLBank,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      disabled: {
        type: GraphQLBoolean
      }
    },
    resolve: async (rootValue, { id, disabled = true }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().banks.update(id, { disabled })
      } catch (err) {
        throw err
      }
    }
  },
  updateBank: {
    type: GraphQLBank,
    args: {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      code: {
        type: GraphQLString
      }
    },
    resolve: async (rootValue, { id, name, code }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().banks.update(id, { name, code })
      } catch (err) {
        throw err
      }
    }
  }
}
