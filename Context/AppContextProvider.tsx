import { useLazyQuery } from '@apollo/client';
import {
	createContext,
	ReactNode,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { Unit, User } from '../interfaces';
import useWindowSize from './../hooks/useWindowSize';
import { GET_USER_BY_ID } from './../query/user';
import { AppReducer } from './AppReducer';
import { ACTION_TYPES, StateType } from './contextUtils';

const initialState = {
	user: undefined,
	comparing: [] as any[],
	filterState: {} as any,
} as StateType;

export const AppContext = createContext<StateType>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const deviceSize = useWindowSize();

	const [state, dispatch] = useReducer(AppReducer, initialState);

	const [fetchUserData, { data: userData }] = useLazyQuery(GET_USER_BY_ID, {
		onCompleted() {
			console.log('onCompleted setUser', { ...userData.core_users_by_pk });
			setUser({ ...userData.core_users_by_pk });
		},
		onError(error) {
			console.log(error);
		},
		fetchPolicy: 'no-cache',
	});
	useEffect(() => {
		const getUserSession = async () => {
			const response = await fetch('/api/getUserSession', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.status === 200) {
				let currentUser = await response.json();
				let currentUserId = currentUser.id;
				fetchUserData({
					variables: {
						id: currentUserId,
					},
				});
			}
		};
		getUserSession();
	}, []);

	const updateUser = async () => {
		console.log('will updateUser');
		const response = await fetch('/api/getUserSession', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.status === 200) {
			let currentUser = await response.json();
			let currentUserId = currentUser.id;
			fetchUserData({
				variables: {
					id: currentUserId,
				},
			});
		}
	};

	const setUser = (user: User | undefined) => {
		dispatch({
			type: ACTION_TYPES.SET_USER,
			payload: user,
		});
	};
	const setComparing = (unit: Unit) => {
		dispatch({
			type: ACTION_TYPES.SET_COMPARING,
			payload: unit,
		});
	};
	const clearComparing = () => {
		dispatch({
			type: ACTION_TYPES.CLEAR_COMPARING,
			payload: null,
		});
	};
	const filterUnitsGlobal = (filterState: any) => {
		dispatch({
			type: ACTION_TYPES.FILTER_BY_CITY,
			payload: filterState,
		});
	};
	const [loginModal, setLoginModal] = useState(false);

	// const checkTablet = (windowWidth: number) => {
	//     if(   ){

	//     }
	// }
	const contextValues: StateType = {
		...state,
		isMobile: deviceSize?.width! < 768,
		isTablet: 767 < deviceSize?.width! && deviceSize?.width! < 1023,
		setUser,
		updateUser,
		setComparing,
		clearComparing,
		loginModal,
		setLoginModal,
		filterUnitsGlobal,
	};
	return (
		<AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
	);
};
