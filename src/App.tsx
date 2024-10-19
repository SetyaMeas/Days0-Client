// TODO: start working on task
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthProvider from "./authentication/AuthProvider";
import Header from "./components/homePage/Header";
import WelcomePage from "./pages/WelcomePage";
import GlobalErrorHandling from "./GlobalErrorHandling";
import ProtectedRoute from "./authentication/ProtectedRoute";
import AuthRoute from "./authentication/AuthRoute";
import LogoutPage from "./pages/LogoutPage";
import ProtectedPage from "./pages/ProtectedPage";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalErrorHandling>
                <AuthProvider>
                    <BrowserRouter>
                        <div className="w-screen h-screen flex flex-col justify-center items-center">
                            <Header />
                            <div className="h-full w-full">
                                <Routes>
                                    <Route path="/" element={<WelcomePage />} />
                                    <Route
                                        path="/protected"
                                        element={<ProtectedPage />}
                                    />
                                    <Route
                                        path="/auth/*"
                                        element={<AuthRoute />}
                                    />
                                    <Route
                                        path="/logout"
                                        element={<LogoutPage />}
                                    />
                                    <Route
                                        path="/home/*"
                                        element={<ProtectedRoute />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </BrowserRouter>
                </AuthProvider>
            </GlobalErrorHandling>
        </QueryClientProvider>
    );
};

export default App;
