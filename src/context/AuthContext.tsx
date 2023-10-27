import { createContext, useEffect, useState } from "react";

import Cookies from "js-cookie";

type TAuthConfig = {
  fetched: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  accessToken: null | string;

  logout: () => void;
  setAuthCredentials: (_accessToken: string) => void;
  setCredentials: () => void;
};

export const AuthContext = createContext<TAuthConfig>({
  fetched: false,
  isLoggedIn: false,
  loading: true,
  accessToken: null,
  logout: () => {},
  setAuthCredentials: (_accessToken: string) => {},
  setCredentials: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [fetched, setFetched] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setCredentials = async () => {
    try {
      const _accessToken = Cookies.get("user");
      if (_accessToken) {
        setAccessToken(_accessToken);
        setIsLoggedIn(true);
        setLoading(false);
      }
      setFetched(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCredentials();
    }
  }, []);

  const logout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
    setFetched(false);
    setLoading(true);
  };

  const setAuthCredentials = (_accessToken: string) => {
    Cookies.set("user", _accessToken);
    setAccessToken(_accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        fetched,
        isLoggedIn,
        loading,
        accessToken,
        logout,
        setAuthCredentials,
        setCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
