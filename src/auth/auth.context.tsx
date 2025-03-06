import {IAuthContext, IAuthContextAction, IAuthContextActionTypes, IAuthContextState} from "../types/auth.types.ts";
import {createContext, ReactNode} from "react";

// We need a reducer function for useReducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
    if (action.type === IAuthContextActionTypes.LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload,
        };
    }
    if (action.type === IAuthContextActionTypes.LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined,
        };
    }
    return state;
};

// We need an initial state object for useReducer hook
const initialAuthState: IAuthContextState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined,
};

// We create our context here and export it
export const AuthContext = createContext<IAuthContext | null>(null);

// We need an interface for our context props
interface IProps {
    children: ReactNode;
}