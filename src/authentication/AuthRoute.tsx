import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LoginPage from "../pages/LoginPage";

const AuthRoute = () => {
    const { isFetching, isLogin } = useAuth();

    if (!isFetching) {
        if (isLogin) {
            return <Navigate to="/home" />;
        }

        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        );
    }
};

export default AuthRoute;
