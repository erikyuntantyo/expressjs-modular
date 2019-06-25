# expressjs-modular

> Implementation ExpressJS modular approach with ES6 and GraphQL example

## About

This is an example of ExpressJS modular approach that uses ES6 and include GraphQL example.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org) and [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) installed. And also [nodemon](https://nodemon.io/) to monitor the source and automatically restart the server when any changes in the source.

2. Install dependencies
    ```$ cd path/to/expressjs-modular```

    Using `yarn`
    ```bash
    $ yarn
    ```

    Using `npm`
    ```bash
    $ npm install
    ```

3. Run
    Using yarn
    ```bash
    $ yarn start
    ```

    Using npm
    ```bash
    $ npm start
    ```

4. Test
    Using yarn
    ```
    $ yarn test
    ```

    Using npm
    ```
    $ npm test
    ```

## Directory Structure

```tree
root  // root folder
  |- config // server configuration files
  |- src // main sources
  |    |- graphql-schema // graphql schema
  |    |- helpers        // helper classes
  |    |- hooks          // global hook middleware
  |    |- models         // database model classes
  |    |- services       // service and hook modules
  |
  |- test   // test unit module
```

## API Blueprint

#### Users Endpoint

```diff
# GET /users/:id

# GET /users

# POST /users
  + payload object

# UPDATE /users/:id
  + payload object

# DELETE /users/:id
```

#### Banks Endpoint

```diff
# GET /banks/:id

# GET /banks

# POST /banks
  + payload object

# UPDATE /banks/:id
  + payload object

# DELETE /banks/:id
```

#### Accounts Endpoint

```diff
# GET /accounts/:id

# GET /accounts

# POST /accounts
  + payload object

# UPDATE /accounts/:id
  + payload object

# DELETE /accounts/:id
```

#### Transactions Endpoint

```diff
# GET /transactions/:id

# GET /transactions

# POST /transactions
  + payload object

# UPDATE /transactions/:id
  + payload object

# DELETE /transactions/:id
```

#### Authentication Token Endpoint

```diff
# POST /auth/token
  + payload object
```

## Features

1. Rest API endpoint

2. GraphQL endpoint

3. Endpoint authorization in the header and allow to enabled or disabled from the hook of each service modules

## Todo

1. Adds another graphql schema to handle all CRUD processes

2. Completing transaction module

## Changelog

__0.1.0__

- Initial commit

__0.1.1__

- Changes node module package

- Inserts strict method

- Update service base class middleware method

- Updates password hashing global hook

- Updates authentication global hook

- Adds authentication service module

- Attaches authentication global hook

__0.1.2__

- Updates eslint setting

- Enables graphql

__0.1.3__

- Updates service classes methods

- Sets unique id before created data

- Removes unused argument

- Fixes typo method name in model-base class

- Updates graphql module

- Updates default server configuration

## License

Copyright (c) 2019

Licensed under the [MIT license](LICENSE).