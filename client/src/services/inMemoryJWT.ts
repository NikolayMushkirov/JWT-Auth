import config from "../config";
import { AuthClient } from "../contexts/AuthContext";

function inMemoryJWTService() {
  let inMemoryJWT: string | null = null;
  let refreshTimeOutId: ReturnType<typeof setTimeout> | null = null;

  const refreshToken = (expiration: number) => {
    const timeOutTrigger = expiration - 10000;

    refreshTimeOutId = setTimeout(() => {
      AuthClient.post("/refresh")
        .then((res) => {
          const { accessToken, accessTokenExpiration } = res.data;
          setToken(accessToken, accessTokenExpiration);
        })
        .catch((error) => console.log(error));
    }, timeOutTrigger);
  };

  const abortRefreshToken = () => {
    if (refreshTimeOutId) {
      clearTimeout(refreshTimeOutId);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = (token: string, tokenExpiration: number) => {
    inMemoryJWT = token;
    refreshToken(tokenExpiration);
  };

  const deleteToken = () => {
    inMemoryJWT = null;
    abortRefreshToken();
    localStorage.setItem(config.LOGOUT_STORAGE_KEY, Date.now().toString());
  };
  return { getToken, setToken, deleteToken };
}

export default inMemoryJWTService();
