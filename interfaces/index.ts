// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
	id: string;
	username?: string;
	email?: string | null;
	name?: string;
	ext_data?: any;
	media?: any;
};

export type Unit = {
	id: string;
	bathrooms: number; //filter (modal)
	bedrooms: number; //filter (modal)
	bua: number; //filter (modal)
	land: number;
	compound: {
		//filter (modal)
		id: string;
		media: any;
		units: Unit[];

		name: {
			ar: string;
			en: string;
		};
		developer: {
			//filter (modal)
			id: string;
			name: {
				ar: string;
				en: string;
			};
			media: any;
			phone?: string;
			email?: string;
		};
	};
	delivery_month: string | number;
	delivery_year: string | number; //filter
	media: any;
	slug_ar: string;
	slug_en: string;
	sk_city: {
		_id: string;
		name: string;
		name_ar: string;
	}; //filter(location)
	sk_district: {
		_id: string;
		name: string;
		name_ar: string;
	};
	fin_total: number; //filter (payment)
	fin_monthly_payment: number; //filter (payment)
	fin_down_payment: number; //filter (payment)
	fin_years: number; //filter (payment)
	property_type: {
		//filter (prop type)
		name: {
			ar: string;
			en: string;
		};
		id: string;
	};
	wishListed: boolean;
	comparing: boolean;
	description?: string;
	parking?: any;
	petsAllowed?: any;
	lat?: number;
	lng?: number;
};

export type Offer = {
	id: number | string;
	projectName: string;
	projectImage: string;
	projectDeveloperLogo: string;
	startingPrice: string;
	discountPer: string;
};
