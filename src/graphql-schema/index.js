import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString
} from 'graphql'
import { Kind } from 'graphql/language'

import Models from '../models'

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  serialize: value => value.getTime(),
  parseValue: value => new Date(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }

    return null
  }
})

const BanksType = new GraphQLObjectType({
  name: 'banks',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    code: {
      type: GraphQLString
    }
  }
})

const AccountsType = new GraphQLObjectType({
  name: 'Accounts',
  fields: {
    id: {
      type: GraphQLID
    },
    accountNumber: {
      type: GraphQLString
    },
    bank: {
      type: BanksType,
      resolve: async (parent) => await Models.getModels().banks.get(parent.bankId)
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    dob: {
      type: GraphQLDate
    },
    address: {
      type: GraphQLString
    },
    phone: {
      type: GraphQLString
    }
  }
})

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: {
    id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    account: {
      type: AccountsType,
      resolve: async (parent) => await Models.getModels().accounts.get(parent.accountId)
    }
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    Users: {
      type: GraphQLList(UsersType),
      resolve: async () => await Models.getModels().users.find()
    },
    User: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (parent, args) => await Models.getModels().users.get(args.id)
    },
    Accounts: {
      type: GraphQLList(AccountsType),
      resolve: async () => await Models.getModels().accounts.find()
    },
    Account: {
      type: AccountsType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: async (parent, args) => await Models.getModels().accounts.get(args.id)
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    newUser: {
      type: UsersType,
      args: {
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        }
      },
      resolve: async (value, data) => {
        let { dataValues: user } = await Models.getModels().users.post(data)
        return user
      }
    },
    opsUser: {
      type: UsersType,
      args: {
        id: {
          type: GraphQLID
        },
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        type: {
          type: GraphQLString
        }
      },
      resolve: async (value, body) => {
        let { username, password, type, ops } = body
        let data

        if (ops === 'new') {
          data = { username, password, type }

          const { dataValues: user } = await Models.getModels().users.post(data)

          return user
        }

        if (ops === 'edit') {
          // edit data
        }

        if (ops === 'delete') {
          // edit data
        }

        return data
      }
    }
  }),
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
