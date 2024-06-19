import { setContext } from '@apollo/client/link/context'
// @ts-ignore
import { createUploadLink } from 'apollo-upload-client'
import { onError } from '@apollo/client/link/error'
import { InMemoryCache } from '@apollo/client/cache'
import { ApolloClient } from '@apollo/client/core'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

loadDevMessages()
loadErrorMessages()

const getToken = (name: string) => {
  const value = `; ${document.cookie}`
  console.log(document.cookie)
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

// auth link
const authLink = setContext(async (_, { headers }) => {
  const token = getToken('__session')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql',
  headers: {
    'apollo-require-preflight': 'true',
  },
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getMessages: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  link: authLink.concat(uploadLink).concat(errorLink),
  cache,
})
export default client
