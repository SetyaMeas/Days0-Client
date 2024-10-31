import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useError } from "../GlobalErrorHandling";

interface IAuthContext {
    isLogin: boolean;
    logout: () => void;
    isFetching: boolean;
}

const api = import.meta.env.VITE_API;
const AuthContext = createContext<IAuthContext>({
    isLogin: false,
    logout: () => {},
    isFetching: true,
});

async function fetchVerifyLogin() {
    const res = await fetch(`${api}/api/auth/verify-login`, {
        method: "GET",
        credentials: "include",
    });
    return res;
}

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { setErrValue } = useError();
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    /* if session storage didn't have "login" item
     * then fetch "verify-login"
     */
    const ssLogin = sessionStorage.getItem("login");

    const { data, isPending, isError } = useQuery({
        queryKey: ["verify-login"],
        queryFn: fetchVerifyLogin,
        enabled: ssLogin == null,
    });

    useEffect(() => {
        if (isError) {
            setErrValue({
                code: 500,
                msg: "Something went wrong",
                status: "failed",
            });
            setIsFetching(false);
        }
        if (data) {
            if (data.status == 200) {
                sessionStorage.setItem("login", "Yes");
            } else if (data.status == 401) {
                sessionStorage.setItem("login", "No");
            } else {
                setErrValue({
                    code: 500,
                    msg: "Something went wrong",
                    status: "failed",
                });
                sessionStorage.setItem("login", "No");
            }

            setIsFetching(false);
        }

        /*
         * if session storage already had "login" item
         * we don't fetch "verify-login" anymore
         */
        if (ssLogin != null) {
            if (ssLogin === "Yes") {
                setIsLogin(true);
            }
            setIsFetching(false);
        }
    }, [isError, data]);

    if (isPending && ssLogin == null) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                isFetching,
                isLogin,
                logout: () => {
                    setIsLogin(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
