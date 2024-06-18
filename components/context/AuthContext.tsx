import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister?: (data: any) => Promise<any>;
  onLogin?: (data: any) => Promise<any>;
  onLogout?: () => void;
}

const TOKEN_KEY = "jwt";
export const API_URL = "http://localhost:5000/api";

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const isTokenValid = (token: string | null): boolean => {
    // if (!token) return false;
    // try {
    //   // const decoded = jwtDecode<JwtPayload>("");
    //   const currentTime = Date.now() / 1000;
    //   return decoded.exp && decoded.exp > currentTime;
    // } catch (error) {
    //   return false;
    // }
    return false;
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("i am a token", token);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            token,
            authenticated: true,
          });
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (error) {
        console.error("Error loading token:", error);
        setAuthState({ token: null, authenticated: false });
      }
    };

    loadToken();
  }, []);

  const register = async (data: any) => {
    const { email, username, password } = data;
    try {
      if (email && password && username) {
        const response = await axios.post(
          `${API_URL}/auth/signup/`,
          {
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const login = async (data: any) => {
    const { email, password } = data;
    if (!(email && password)) {
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.token) {
        const token = response.data.token;
        setAuthState({
          token,
          authenticated: true,
        });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("token before setting:", token.toString());
        await AsyncStorage.setItem(TOKEN_KEY, token.toString());
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    console.log("logout....");
    await AsyncStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
