import { createContext, useContext, useEffect, useState } from "react";

interface IErrorContext {
    status: 200 | 400 | 401 | 500;
    message: string;
}

const ErrorContext = createContext<{
    setErrorValue: (err: IErrorContext) => void;
}>({
    setErrorValue: () => { },
});
export const useError = () => {
    return useContext(ErrorContext);
};

const GlobalErrorHandling = ({ children }: { children: JSX.Element }) => {
    const [error, setError] = useState<IErrorContext>({
        status: 200,
        message: "",
    });

    useEffect(() => {
        if (error.status == 500) {
            if (error.message !== "") {
                alert(error.message);
            } else {
                alert("Something went wrong");
            }
        } else if (error.status === 401) {
            window.location.pathname = "/logout";
        }
    }, [error]);

    function setErrorValue(err: IErrorContext) {
        setError(err);
    }

    return (
        <ErrorContext.Provider value={{ setErrorValue }}>
            {children}
        </ErrorContext.Provider>
    );
};

export default GlobalErrorHandling;
