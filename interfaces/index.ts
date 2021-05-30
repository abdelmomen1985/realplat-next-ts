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
  compound: {
    //filter (modal)
    name: any;
    developer: {
      //filter (modal)
      name: any;
      media: any;
    };
  };
  delivery_month: string | number;
  delivery_year: string | number; //filter
  media: any;
  slug_ar: string;
  slug_en: string;
  sk_city: any; //filter(location)
  fin_total: number; //filter (payment)
  fin_monthly_payment: number; //filter (payment)
  fin_down_payment: number; //filter (payment)
  fin_years: number; //filter (payment)
  property_type: {
    //filter (prop type)
    name: any;
    id: string;
  };
  wishListed: Boolean;
  comparing: Boolean;
};

export type Offer = {
  id: number | string;
  projectName: string;
  projectImage: string;
  projectDeveloperLogo: string;
  startingPrice: string;
  discountPer: string;
};
