import { gql } from 'apollo-server-core';

export const commonSchemas = gql`
  scalar Date
  scalar JSON

  interface ListResponse {
    total: Int!
  }

  input PaginationArgs {
    offset: Int! = 0
    limit: Int! = 20
  }

  """
  The convention is to include in the response object each fields of the objects it modified.
  read in greater details topic on the apollo documentation [apollo documentation](https://www.apollographql.com/docs/apollo-server/schema/schema/#structuring-mutation-responses).

  Following this pattern provides a client with helpful, detailed information about the result of each requested operation. Equipped with this information, developers can better react to operation failures in their client code.
  """
  interface MutationResponse {
    "represents the status of the data transfer, (HTTP status)"
    code: Int!
    "indicates whether the mutation was successful. This allows a coarse check by the client to know if there were failures."
    success: Boolean!
    "string that describes the result of the mutation. It is intended to be used in the UI of the product."
    message: String!
  }
`;
