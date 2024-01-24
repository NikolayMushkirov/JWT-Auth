import { ReactNode, createContext, useEffect, useState } from "react";

import axios from "axios";

import config from "../config";

import inMemoryJWT from "../services/inMemoryJWT";
import showErrorMessage from "../utils/showErrorMessage";
import { SignInData, SignUpData } from "../types/types";

type Props = { children: ReactNode };

export type AuthContext = {
  data?: string | null;
  isUserLogged: boolean;
  handleSignUp: (inputData: SignUpData) => void;
  handleSignIn: (inputData: SignInData) => void;
  handleFetchProtected: () => void;
  handleLogout: () => void;
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

export const AuthContext = createContext<AuthContext | null>(null);
function AuthProvider({ children }: Props) {
  const [data, setData] = useState<null | string>("");
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  const handleFetchProtected = () => {
    ResourceClient("/protected")
      .then((res) => {
        setData(res.data);
      })
      .catch(showErrorMessage);
  };

  const handleSignUp = (inputData: SignUpData) => {
    AuthClient.post("/sign-up", inputData)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true)
      })
      .catch(showErrorMessage);
  };

  const handleSignIn = (inputData: SignInData) => {
    AuthClient.post("/sign-in", inputData)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsUserLogged(true)
      })
      .catch(showErrorMessage);
  };

  const handleLogout = () => {
    AuthClient.post("/logout")
      .then(() => {
        setIsUserLogged(false);
        inMemoryJWT.deleteToken();
        setData(null);
      })
      .catch((error) => showErrorMessage(error));
  };

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  }, []);

  useEffect(() => {
    const handlePersistedLogOut = (event: StorageEvent) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };

    window.addEventListener("storage", handlePersistedLogOut);

    return () => {
      window.removeEventListener("storage", handlePersistedLogOut);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        handleSignUp,
        handleSignIn,
        handleFetchProtected,
        handleLogout,
        isUserLogged,
      }}
    >
      {isAppReady && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
