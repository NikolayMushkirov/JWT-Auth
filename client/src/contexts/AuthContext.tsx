import { ReactNode, createContext, useState } from "react";
import config from "../config";

type Props = { children: ReactNode };

const baseUrl = `${config.API_URL}`;

export const AuthClient = async (endPoint = "", data = {}) => {
  const response = await fetch(baseUrl + "/auth" + endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
};
export const ResourceClient = async (endPoint = "", data = {}) => {
  const response = await fetch(baseUrl + "/resource" + endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const AuthContext = createContext({});
function AuthProvider({ children }: Props) {
  const [data, setData] = useState();

  const handleSignUp = (data) => {
    AuthClient("/sign-up", data);
  };

  const handleSignIn = (data) => {};

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
