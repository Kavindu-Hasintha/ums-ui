import {
    IAuthContext,
    IAuthContextAction,
    IAuthContextActionTypes,
    IAuthContextState,
    ILoginResponseDto
} from "../types/auth.types.ts";
import {createContext, ReactNode, useCallback, useEffect, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import {getSession, setSession} from "./auth.utils.ts";
import axiosInstance from "../utils/axiosInstance.ts";
import {LOGIN_URL, ME_URL, PATH_AFTER_LOGIN, PATH_AFTER_REGISTER, REGISTER_URL} from "../utils/globalConfig.ts";
import toast from "react-hot-toast";

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

// We create a component to manage all auth functionalities and export it and use it
const AuthContextProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const navigate = useNavigate();

    // Initialize Method
    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if (token) {
                // validate accessToken by calling backend
                const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
                    token,
                });
                // In response, we receive jwt token and user data
                const { newToken, userInfo } = response.data;
                setSession(newToken);
                dispatch({
                    type: IAuthContextActionTypes.LOGIN,
                    payload: userInfo,
                });
            } else {
                setSession(null);
                dispatch({
                    type: IAuthContextActionTypes.LOGOUT,
                });
            }
        } catch (error) {
            setSession(null);
            dispatch({
                type: IAuthContextActionTypes.LOGOUT,
            });
        }
    }, []);

    // In start of application, we call initializeAuthContext to be sure about authentication status
    useEffect(() => {
        console.log('AuthContext Initialization start');
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successful'))
            .catch((error) => console.log(error));
    }, []);

    // Register Method
    const register = useCallback(
        async (firstName: string, lastName: string, userName: string, email: string, password: string, address: string) => {
            const response = await  axiosInstance.post(REGISTER_URL, {
                firstName,
                lastName,
                userName,
                email,
                password,
                address,
            });
            console.log('Register Result: ', response);
            toast.success('Register was successful. Please Login.');
            navigate(PATH_AFTER_REGISTER);
        }, []);

    // Login Method
    const login = useCallback(async (userName: string, password: string) => {
        const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
            userName,
            password,
        });
        toast.success('Login was successful');
        // In response, we receive jwt token and user data
        const { newToken, userInfo } = response.data;
        setSession(newToken);
        dispatch({
            type: IAuthContextActionTypes.LOGIN,
            payload: userInfo,
        });
        navigate(PATH_AFTER_LOGIN);
    }, []);

    // Logout Method
};