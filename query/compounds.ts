import { gql } from '@apollo/client';
export const allCompounds = gql`
  query CompoundsQuery {
    compounds {
      id
      name
      media
      description
    }
  }
`;
export const COMPOUNDS_BY_PK = gql`
query compounds_by_pk ($id: uuid!){
    compounds_by_pk(id: $id) {
      id
      media
      name
      description
      developer {
        name
        id
        media
      }
      units {
        id
        bathrooms
        bedrooms
        bua
        sk_city
        fin_total
        fin_monthly_payment
        fin_down_payment
        fin_years
        compound {
            name
            developer {
            name(path: "ar")
            media(path: "card_icon")
            }
        }
        delivery_month
        delivery_year
        media(path: "photos")
        slug_ar
        slug_en
        property_type {
            name
            id
        }
      }
    }
  }
  
`