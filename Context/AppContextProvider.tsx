import { createContext, ReactNode, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReducer";
import { ACTION_TYPES, StateType } from "./contextUtils";

const initialState = {
  user: undefined,
} as StateType;

export const AppContext = createContext<StateType>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  const contextValues: StateType = {
    ...state,
    setUser,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
