import { gql } from '@apollo/client';

export const UNIT_FIELDS = `
  id
  bathrooms
  bedrooms
  bua
  sk_city
  sk_district
  fin_total
  fin_monthly_payment
  fin_down_payment
  fin_years
  land
  description
  compound {
    name
    developer {
      id
      name(path: "ar")
      media(path: "card_icon")
      phone 
      email
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
export const FULL_UNITS = gql`
  query UnitsQuery {
    units {
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
    $sk_city_comparison: jsonb
    $sk_district_comparison: jsonb
    $bathrooms: Int
    $bedrooms: Int
    $delivery_year_min: Int
    $delivery_year_max: Int
    $land_min: Int
    $land_max:  Int 
    $finishing_type: String
    $user_id: uuid
    $compound_id: uuid

  ) {
    units_aggregate(
      limit: 24
      where: {
        property_type_id: { _in: $pt_ids }
        fin_down_payment: {
          _gte: $fin_down_payment_min
          _lte: $fin_down_payment_max
        }
        compound_id: {_eq: $compound_id}
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
        sk_city:{
          _contains: $sk_city_comparison
        }
        sk_district:{
          _contains: $sk_district_comparison
        }
        bathrooms: {
          _eq: $bathrooms
        }
        bedrooms: {
          _eq: $bedrooms
        }
        delivery_year: {
          _gte: $delivery_year_min,
           _lte: $delivery_year_max,
          }
        land: {
          _gte: $land_min
          _lte: $land_max
        }
        finishing_type: {
          _eq: $finishing_type
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
    core_user_wishlist_aggregate(where: {user_id: 
        {_eq: $user_id}}) {
      nodes {
       unit{
        id
       }
      }
    }
  }
`;
export const UNITS_BY_PK = gql`
  query units_by_pk($id: uuid!) {
    units_by_pk(id: $id) {
      bathrooms
      bedrooms
      bua
      compound {
        name
        id
        media
        developer {
          name
          media
          id
          phone
          email
        }
        units(limit: 3) {
          ${UNIT_FIELDS}
        }
      }
      delivery_month
      delivery_year
      description
      fin_down_payment
      fin_monthly_payment
      fin_total
      fin_years
      finishing_type
      id
      land
      lat
      lng
      media
      npv
      property_type {
        name
        id
      }
      sk_city
      sk_district
    }
  }
`;
export const USER_WISHLIST_IDS = gql`
	query user_wishlist($user_id: uuid) {
		core_user_wishlist_aggregate(where: { user_id: { _eq: $user_id } }) {
			nodes {
				unit {
					id
				}
			}
		}
	}
`;
