import { useQuery } from '@apollo/client'
import { GetServersQuery, GetServersQueryVariables } from '../../../gql/graphql'
import { GET_SERVERS } from '../../../graphql/queries/getServers'

export function useServers() {
  const { data: servers, loading } = useQuery<
    GetServersQuery,
    GetServersQueryVariables
  >(GET_SERVERS)

  return { servers: servers?.getServers, loading }
}
