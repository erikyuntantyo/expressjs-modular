'use strict'

import { GraphQLFloat, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLDate, GraphQLTransaction } from '../types'
import Models from '../../models'

export default {
  transactionById: {
    type: GraphQLTransaction,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { id }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        return await Models.getModels().transactions.get(id)
      } catch (err) {
        throw err
      }
    }
  },
  transactionByUserId: {
    type: new GraphQLList(GraphQLTransaction),
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { userId }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        const { data } = Models.getModels().transactions.find({ where: { userId } })
        return data
      } catch (err) {
        throw err
      }
    }
  },
  transactionByUserIdAndDateRange: {
    type: new GraphQLList(GraphQLTransaction),
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      },
      startDate: {
        type: new GraphQLNonNull(GraphQLDate)
      },
      endDate: {
        type: new GraphQLNonNull(GraphQLDate)
      }
    },
    resolve: async (rootValue, { userId, startDate, endDate }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        const { data } = Models.getModels().transactions.find({
          where: {
            userId,
            createdAt: {
              $between: [startDate, endDate]
            }
          }
        })
        return data
      } catch (err) {
        throw err
      }
    }
  },
  userEffectiveBalance: {
    type: GraphQLFloat,
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { userId }, { headers: { authorization } }) => {
      try {
        await CommonHelper.verifyAuthToken(authorization)
        const { data: [{ balance }] } = Models.getModels().transactions.find({
          where: { userId },
          order: [['createdAt', 'DESC']]
        })
        return balance
      } catch (err) {
        throw err
      }
    }
  }
}
