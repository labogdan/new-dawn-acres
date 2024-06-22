import { DocumentNode, useQuery } from '@apollo/react-hooks'

export default function useRequest(gqlQuery: DocumentNode) {
  const { data, loading, error } = useQuery(gqlQuery, {
    context: {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TAKESHAPE_API}`,
      },
    },
  })
  return { loading, error, data }
}