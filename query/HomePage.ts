import { gql } from '@apollo/client';

export const IMAGE_FIELDS = `
      height
      width
      previewUrl
      url
      id
      alternativeText
`;

export const HOME_PAGE_CATEGORIES_FRAGMENT = gql`
	fragment HomePageCategoriesFields on HomepageCategories {
		created_at
		id
		name_ar
		name_en
    images{
      ${IMAGE_FIELDS}
    }
	}
`;
export const HOME_PAGE_CITIES_FRAGMENT = gql`
	fragment HomePageCitiesFields on HomepageCities {
		created_at
		id
		listed_offers
		name_ar
		name_en
    images {
      ${IMAGE_FIELDS}
    }
	}
`;

export const HOME_PAGE_CARDS_FRAGMENT = gql`
	fragment HomePageCardsFields on HomepageCards {
		id
		title_ar
		title_en
		description_ar
		description_en
		link_ar
		link_en
    images {
      ${IMAGE_FIELDS}
    }
	}
`;

export const HOME_PAGE_EXPO_FRAGMENT = gql`
	fragment HomePageExpoFields on HomepageExpos {
		id
		expo_type_ar
		expo_type_en
		type
		location_ar
		location_en
		name_ar
		name_en
		status_ar
		status_en
     images {
      ${IMAGE_FIELDS}
    }
	}
`;

export const HOME_PAGE_SECTIONS = gql`
	${HOME_PAGE_CATEGORIES_FRAGMENT}
	${HOME_PAGE_CITIES_FRAGMENT}
	${HOME_PAGE_CARDS_FRAGMENT}
	${HOME_PAGE_EXPO_FRAGMENT}

	query HomePage {
		homepageCategories {
			...HomePageCategoriesFields
		}
		homepageCities {
			...HomePageCitiesFields
		}
		homepageCards {
			...HomePageCardsFields
		}
		homepageExpos {
			...HomePageExpoFields
		}
	}
`;
