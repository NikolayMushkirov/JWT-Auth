import { ReactNode, createContext, useState } from "react";

import config from "../config";

import { SignInInputsData, SignUpInputsData } from "../types/types";

type Props = { children: ReactNode };

type AuthContextValue = {
  data: SignInInputsData | SignUpInputsData | undefined;
  handleSignUp: (data: SignUpInputsData) => void;
  handleSignIn: (data: SignInInputsData) => void;
};

const baseUrl = `${config.API_URL}`;

export const AuthClient = async (endPoint: string, data = {}) => {
  const response = await fetch(baseUrl + "/auth" + endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
};
export const ResourceClient = async (endPoint: string, data = {}) => {
  const response = await fetch(baseUrl + "/resource" + endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const AuthContext = createContext<Partial<AuthContextValue>>({});
function AuthProvider({ children }: Props) {
  const [data, setData] = useState();

  const handleSignUp = (data: SignUpInputsData) => {
    AuthClient("/sign-up", data);
  };

  const handleSignIn = (data: SignInInputsData) => {
    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        handleSignUp,
        handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
