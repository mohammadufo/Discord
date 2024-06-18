import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

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
