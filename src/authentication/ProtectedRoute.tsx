import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import TaskPage from "../pages/TaskPage";

const ProtectedRoute = () => {
    const { isFetching, isLogin } = useAuth();

    if (!isFetching) {
        if (!isLogin) {
            return <Navigate to="/" />;
        }

        return (
            <Routes>
                <Route path="/*" element={<TaskPage />} />
            </Routes>
        );
    }
};

export default ProtectedRoute;
