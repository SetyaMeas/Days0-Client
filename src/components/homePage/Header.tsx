import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authentication/AuthProvider";

const Header = () => {
    const { isFetching, isLogin } = useAuth();
    const refScreenBlocker = useRef<HTMLDivElement>(null);

    function openDropDownMenu() {
        if (refScreenBlocker.current) {
            refScreenBlocker.current.style.display = "flex";
        }
    }
    function hideDropDownMenu() {
        if (refScreenBlocker.current) {
            refScreenBlocker.current.style.display = "none";
        }
    }
    return (
        <header className="w-full h-[51px] border-b-bdColor border-b-[1px] px-[15px] flex justify-between items-center">
            <p className="text-[20px] font-bold font-sans text-[white]">
                Days0
            </p>
            {isFetching ? null : isLogin ? (
                <button
                    onClick={openDropDownMenu}
                    className="text-[white] text-[15px] text-center w-[30px] h-[30px] rounded-[3px]  bg-default border border-bdColor hover:opacity-90"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
            ) : (
                <Link
                    to="/auth/login"
                    className="text-[white] text-[16px] text-center px-[9px] h-[30px] rounded-[3px]  bg-default border border-bdColor hover:opacity-90"
                >
                    Login
                </Link>
            )}
            <div
                ref={refScreenBlocker}
                className="absolute w-screen h-screen top-0 left-0 hidden flex-row-reverse cursor-default"
                role="button"
                onClick={hideDropDownMenu}
            >
                <div className="w-[200px] bg-default border border-bdColor mt-[42px] mr-[15px] absolute text-[white] text-[15px]">
                    <Link
                        to="/home"
                        className="w-full text-left py-[3px] px-[15px] hover:bg-bdColor flex items-center gap-[15px]"
                    >
                        <i className="w-[20px] fa-solid fa-home text-[12px]"></i>
                        Home
                    </Link>
                    <button className="w-full text-left py-[3px] px-[15px] hover:bg-bdColor flex items-center gap-[15px]">
                        <i className="w-[20px] fa-solid fa-gear text-[12px]"></i>
                        Setting
                    </button>
                    <a
                        href={"/logout"}
                        className="w-full text-left py-[3px] px-[15px] hover:bg-[red] flex items-center gap-[15px]"
                    >
                        <i className="w-[20px] fa fa-sign-out text-[12px]"></i>
                        Logout
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
