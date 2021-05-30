import { User } from "../interfaces";

export type StateType = {
  // day
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  updateUser: () => void;
  comparing: any[];
  setComparing: (val: any) => void;
  clearComparing: () => void;
  loginModal: Boolean;
  setLoginModal: (val: any) => void;
  filterState: any;
  filterUnitsByCity: (val: string) => void;
  isMobile?: boolean;
};

export const setStorageItems = (name: string, items: any[]) => {
  localStorage.setItem(name, JSON.stringify(items.length > 0 ? items : []));
};

export const setStorageSingleItem = (name: string, item: object) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export const getStorageSingleItem = (name: string): object | undefined => {
  if (localStorage.getItem(name))
    return JSON.parse(localStorage.getItem(name)!);
};

export const ACTION_TYPES = {
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
  SET_COMPARING: " SET_COMPARING",
  CLEAR_COMPARING: "CLEAR_COMPARING",
  FILTER_BY_CITY: "FILTER_BY_CITY",
};

export type Action = {
  type: string;
  payload: any;
};
