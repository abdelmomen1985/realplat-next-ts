import { gql } from "@apollo/client";

export const GET_PROPERTY_TYPES = gql`
  query property_types {
    property_types {
      id
      name
    }
  }
`;
