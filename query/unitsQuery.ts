import { gql } from "@apollo/client";

export const UNIT_FIELDS = `
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
`;

export const ALL_UNITS = gql`
  query UnitsQuery {
    units(limit: 50) {
      ${UNIT_FIELDS}
    }
  }
`;

export const UNITS_AGGREGATE = gql`
  query units_aggregate($pt_ids: [uuid!]) {
    units_aggregate(
      limit: 50
      where: { property_type_id: { _in: $pt_ids } }
    ) {
      nodes {
        ${UNIT_FIELDS}
      }
    }
  }
`;
