import {
    createContext,
    CSSProperties,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

interface IErrContext {
    code: 401 | 500;
    status: "success" | "failed" | "warning";
    msg: string;
}

const ErrorContext = createContext<{
    setErrValue: (value: IErrContext) => void;
}>({
    setErrValue: () => {},
});
export const useError = () => {
    return useContext(ErrorContext);
};

const GlobalErrorHandling = ({ children }: { children: JSX.Element }) => {
    const refAlertMsg = useRef<HTMLDivElement>(null);
    const [err, setErr] = useState<IErrContext>({
        status: "success",
        msg: "",
        code: 500,
    });

    // TODO: test this function
    const toggleAlertMsg = (timeout: number) => {
        if (refAlertMsg.current) {
            refAlertMsg.current.style.right = "0px";

            setTimeout(() => {
                if (refAlertMsg.current) {
                    refAlertMsg.current.style.right = "-150px";
                }
            }, timeout);
        }
    };

    useEffect(() => {
        if (err.status !== "success") {
            if (err.code === 401) {
                toggleAlertMsg(2000);
                setTimeout(() => {
                    window.location.pathname = "/logout";
                }, 2500);
            } else if (err.code === 500) {
                toggleAlertMsg(2000);
            }
        }
    }, [err]);

    const setErrValue = (value: IErrContext) => {
        setErr(value);
    };
    const getAlertMsgColor = () => {
        if (err.status === "failed") {
            return "red";
        } else if (err.status === "warning") {
            return "orange";
        }
        return "white";
    };
    const whatStyle: CSSProperties = {
        backgroundColor: getAlertMsgColor(),
    };

    return (
        <ErrorContext.Provider value={{ setErrValue }}>
            <div
                ref={refAlertMsg}
                className="w-[150px] h-[60px] text-[black] bg-[white] rounded-l-[7px] fixed top-[10px] right-[-150px] flex justify-between overflow-hidden duration-200"
            >
                <div style={whatStyle} className="w-[8px] h-full"></div>
                <div className="flex justify-center items-center h-full w-full px-[15px]">
                    <p className="text-[15px] text-center">{err.msg}</p>
                </div>
            </div>
            {children}
        </ErrorContext.Provider>
    );
};

export default GlobalErrorHandling;
