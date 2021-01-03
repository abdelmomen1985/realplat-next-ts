export type FilterListType = {
  property_types?: string[];
  fin_down_payment?: number[];
  fin_total?: number[];
  fin_years?: number[];
  fin_monthly_payment?: number[];
  sk_city?: string;
  bedrooms?: number;
  bathrooms?: number;
  delivery_year?: number;
  space?:number[];
  finishing_type: string;

};

export type PropertyType = {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  selected?: boolean
};
