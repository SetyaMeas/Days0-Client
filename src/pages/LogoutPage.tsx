import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../GlobalErrorHandling";

const api = import.meta.env.VITE_API;

const LogoutPage = () => {
    const { setErrValue } = useError();
    const { data, isError } = useQuery({
        queryFn: async () => {
            const res = await fetch(`${api}/api/auth/logout`, {
                method: "GET",
                credentials: "include",
            });
            return res;
        },
        queryKey: ["logout"],
    });

    useEffect(() => {
        if (isError) {
            setErrValue({
                code: 500,
                msg: "Something went wrong",
                status: "failed",
            });
        }
        if (data) {
            if (data.status == 200) {
                sessionStorage.setItem("login", "No");
                window.location.pathname = "/";
                return;
            } else {
                setErrValue({
                    code: 500,
                    msg: "Something went wrong",
                    status: "failed",
                });
            }
        }
    }, [data, isError]);
    return null;
};

export default LogoutPage;
