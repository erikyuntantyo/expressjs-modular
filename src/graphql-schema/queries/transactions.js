'use strict'

import { GraphQLFloat, GraphQLID, GraphQLNonNull } from 'graphql'

import CommonHelper from '../../helpers/common'
import { GraphQLDate, GraphQLTransaction, GraphQLTransactionsList } from '../types'
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
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().transactions.get(id)
    }
  },
  transactionByUserId: {
    type: GraphQLTransactionsList,
    args: {
      userId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: async (rootValue, { userId }, { headers: { authorization } }) => {
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().transactions.find({ where: { userId } })
    }
  },
  transactionByUserIdAndDateRange: {
    type: GraphQLTransactionsList,
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
      await CommonHelper.verifyAuthToken(authorization)
      return await Models.getModels().transactions.find({
        where: {
          userId,
          createdAt: {
            $between: [startDate, endDate]
          }
        }
      })
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
      await CommonHelper.verifyAuthToken(authorization)
      const { data: [{ balance }] } = await Models.getModels().transactions.find({
        where: { userId },
        order: [['createdAt', 'DESC']]
      })
      return balance
    }
  }
}
