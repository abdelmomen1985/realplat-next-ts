export type FilterListType = {
  property_types: string[];
};

export type PropertyType = {
  id: string;
  name: {
    ar: string;
    en: string;
  };
  selected?: boolean
};
