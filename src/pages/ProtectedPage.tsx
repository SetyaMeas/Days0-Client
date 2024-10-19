import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function fetchVerifyLogin() {
    const api = import.meta.env.VITE_API;
    const res = await fetch(`${api}/api/auth/verify-login`, {
        method: "GET",
        credentials: "include",
    });
    return res;
}
const ProtectedPage = () => {
    const { data } = useQuery({
        queryFn: fetchVerifyLogin,
        queryKey: ["verify-login2"],
    });

    useEffect(() => {
        if (data) {
            if (data.status == 200) {
                sessionStorage.setItem("login", "Yes");
                window.location.pathname = "/home";
                return;
            } else {
                sessionStorage.setItem("login", "No");
                window.location.pathname = "/";
                return;
            }
        }
    }, [data]);
    return null;
};

export default ProtectedPage;
