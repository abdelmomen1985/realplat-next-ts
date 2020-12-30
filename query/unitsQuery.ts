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
  query units_aggregate(
    $pt_ids: [uuid!]
    $fin_down_payment_min: Int
    $fin_down_payment_max: Int
    $fin_monthly_payment_min: Int
    $fin_monthly_payment_max: Int
    $fin_total_min: Int
    $fin_total_max: Int
    $fin_years_min: Int
    $fin_years_max: Int
  ) {
    units_aggregate(
      limit: 50
      where: {
        property_type_id: { _in: $pt_ids }
        fin_down_payment: {
          _gte: $fin_down_payment_min
          _lte: $fin_down_payment_max
        }
        fin_monthly_payment: {
          _gte: $fin_monthly_payment_min
          _lte: $fin_monthly_payment_max
        }
        fin_total: {
          _gte: $fin_total_min
          _lte: $fin_total_max
        }
        fin_years: {
          _gte: $fin_years_min
          _lte: $fin_years_max
        }
      }
    ) {
      nodes {
        ${UNIT_FIELDS}
      }
      aggregate {
        count
      }
    }
  }
`;
