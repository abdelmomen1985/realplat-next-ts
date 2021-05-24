import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";
import { AppReducer } from "./AppReducer";
import { ACTION_TYPES, StateType } from "./contextUtils";
import { useRouter } from "next/router";
import useTranslation from "./../hooks/useTranslation";
import useWindowSize from './../hooks/useWindowSize';


const initialState = {
  user: undefined,
  comparing: [] as any[],
  filterState: {} as any,
} as StateType;
export const AppContext = createContext<StateType>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const deviceSize = useWindowSize();

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const router = useRouter();
  const { locale } = useTranslation();
  useEffect(() => {
    const getUserSession = async () => {
      const response = await fetch("/api/getUserSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) setUser(await response.json());
    };
    getUserSession();
  }, []);

  const setUser = (user: any) => {
    dispatch({
      type: ACTION_TYPES.SET_USER,
      payload: user,
    });
  };
  const setComparing = (unit: any) => {
    dispatch({
      type: ACTION_TYPES.SET_COMPARING,
      payload: unit,
    });
    if (state.comparing.length === 1) {
      router.push(`/${locale}/compare-page`);
    }
    console.log(state.comparing);
  };
  const clearComparing = () => {
    dispatch({
      type: ACTION_TYPES.CLEAR_COMPARING,
      payload: null,
    });
  };
  const filterUnitsByCity = (cityId: string) => {
    dispatch({
      type: ACTION_TYPES.FILTER_BY_CITY,
      payload: cityId,
    });
  }
  const [loginModal, setLoginModal] = useState(false);

  const contextValues: StateType = {
    ...state,
    isMobile: deviceSize.width < 768,
    setUser,
    setComparing,
    clearComparing,
    loginModal,
    setLoginModal,
    filterUnitsByCity
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
