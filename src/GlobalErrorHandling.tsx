import {
    createContext,
    CSSProperties,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

interface IErrContext {
    code: 401 | 500 | 200 | 400 | undefined;
    status: "success" | "failed" | "warning";
    msg: string;
}

const ErrorContext = createContext<{
    setErrValue: (value: IErrContext) => void;
}>({
    setErrValue: () => { },
});
export const useErrorContext = () => {
    return useContext(ErrorContext);
};

const GlobalErrorHandling = ({ children }: { children: JSX.Element }) => {
    const refAlertMsg = useRef<HTMLDivElement>(null);
    const [err, setErr] = useState<IErrContext>({
        status: "success",
        msg: "",
        code: undefined,
    });

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
        if (err.code !== undefined) {
            if (err.code === 401) {
                toggleAlertMsg(3000);
                setTimeout(() => {
                    window.location.pathname = "/logout";
                }, 3500);
            } else if (err.code === 500) {
                toggleAlertMsg(3000);
            } else if (err.code === 200) {
                toggleAlertMsg(3000);
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
        } else if (err.status === "success") {
            return "#00990f";
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
