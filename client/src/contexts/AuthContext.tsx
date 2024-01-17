import { ReactNode, createContext, useState } from "react";

import axios from "axios";

import config from "../config";

import { SignInInputsData, SignUpInputsData } from "../types/types";
import inMemoryJWT from "../services/inMemoryJWT";
import showErrorMessage from "../utils/showErrorMessage";

type Props = { children: ReactNode };

type AuthContextValue = {
  data: SignInInputsData | SignUpInputsData | undefined;
  handleSignUp: (data: SignUpInputsData) => void;
  handleSignIn: (data: SignInInputsData) => void;
  handleFetchProtected: () => void;
};

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});

export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
});

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext<AuthContextValue>({});
function AuthProvider({ children }: Props) {
  const [data, setData] = useState();

  const handleFetchProtected = () => {
    ResourceClient("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (data: SignUpInputsData) => {
    AuthClient.post("/sign-up", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (data: SignInInputsData) => {
    AuthClient.post("/sign-in", data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      })
      .catch(showErrorMessage);
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        handleSignUp,
        handleSignIn,
        handleFetchProtected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
