import { createContext, useContext, useEffect, useState } from "react";

interface IErrorContext {
    status: number;
    message: string;
}

const ErrorContext = createContext<{
    setErrorValue: (err: IErrorContext) => void;
}>({
    setErrorValue: () => {},
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
                alert("something went wrong");
            }
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
