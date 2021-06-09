import { Action, ACTION_TYPES, StateType } from './contextUtils';
import { useRouter } from "next/router";
import useTranslation from './../hooks/useTranslation';

export const AppReducer = (state: StateType, action: Action) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return { ...state, user: action.payload } as StateType;
    }
    case ACTION_TYPES.SET_COMPARING: {
      let comparingList = [...state.comparing];
      // Get the index of id in the array
      const index = comparingList
        .map(function (x) {
          return x.id;
        })
        .indexOf(action.payload.id);
      console.log(index);
      if (index > -1) {
        // This means id is present in the array, so remove it
        comparingList.splice(index, 1);
        console.log(comparingList)
        console.log('not adding');
      } else {
        // This means id is not present in the array, so add it
        comparingList.push(action.payload);
      }
      if (comparingList.length === 2) {
        router.push(`/${locale}/compare-page`);
      }
      return { ...state, comparing: comparingList } as StateType;
    }
    case ACTION_TYPES.CLEAR_COMPARING: {
      return { ...state, comparing: [] };
    }
    case ACTION_TYPES.FILTER_BY_CITY: {
      console.log('payload', action.payload)
      return { ...state, filterState: { ...action.payload } }
    }
    default:
      return state;
  }
};
