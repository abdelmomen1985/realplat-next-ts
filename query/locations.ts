import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
query distinct_cities {
    units (distinct_on:[sk_city]){
      sk_city
    }
  }
`