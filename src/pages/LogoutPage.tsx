import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useError } from "../GlobalErrorHandling";

const api = import.meta.env.VITE_API;

const LogoutPage = () => {
    const { setErrorValue } = useError();
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
            setErrorValue({ status: 500, message: "" });
        }
        if (data) {
            if (data.status == 200) {
                sessionStorage.setItem("login", "No");
                window.location.pathname = "/";
                return;
            } else {
                setErrorValue({ status: 500, message: "" });
            }
        }
    }, [data, isError]);
    return null;
};

export default LogoutPage;
