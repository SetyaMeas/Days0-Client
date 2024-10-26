import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { isValidEmail } from "../utils/validator";
import { useRef } from "react";
import { useError } from "../GlobalErrorHandling";

const api = import.meta.env.VITE_API;
interface IFormInput {
    email: string;
    passwd: string;
}

const LoginPage = () => {
    const mutation = useMutation({
        mutationFn: async (body: IFormInput) => {
            const formData = new FormData();
            formData.append("email", body.email);
            formData.append("paswd", body.passwd);
            const res = await fetch(`${api}/api/auth/login`, {
                headers: {
                    "content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
                credentials: "include",
            });
            return res;
        },
        mutationKey: ["login"],
    });

    const { setErrorValue } = useError();
    const refEmailMsg = useRef<HTMLParagraphElement>(null);
    const refPasswdMsg = useRef<HTMLParagraphElement>(null);
    const refMsg = useRef<HTMLParagraphElement>(null);
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmitForm = async (body: IFormInput) => {
        if (refMsg.current) {
            refMsg.current.style.display = "none";
        }
        if (!isValidEmail(body.email)) {
            if (refEmailMsg.current) {
                refEmailMsg.current.style.display = "block";
            }
            return;
        } else {
            if (refEmailMsg.current) {
                refEmailMsg.current.style.display = "none";
            }
        }

        if (body.passwd == "" || body.passwd.length < 8) {
            if (refPasswdMsg.current) {
                refPasswdMsg.current.style.display = "block";
            }
            return;
        } else {
            if (refPasswdMsg.current) {
                refPasswdMsg.current.style.display = "none";
            }
        }
        sessionStorage.removeItem("login");

        try {
            const res = await mutation.mutateAsync(body);
            if (res.ok) {
                window.location.pathname = "/protected";
                return;
            } else if (res.status == 401) {
                if (refMsg.current) {
                    refMsg.current.style.display = "block";
                }
            } else {
                setErrorValue({ status: 500, message: "" });
            }
        } catch (e) {
            setErrorValue({ status: 500, message: "" });
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[360px] text-[white] flex flex-col gap-[12px] items-center">
                <form
                    className="w-full flex flex-col gap-[12px]"
                    onSubmit={handleSubmit(onSubmitForm)}
                >
                    <p
                        ref={refMsg}
                        className="text-[15px] text-[red] w-full text-center hidden"
                    >
                        email or password is not correct!
                    </p>

                    <p
                        ref={refEmailMsg}
                        className="text-[15px] text-[red] hidden"
                    >
                        invalid email address*
                    </p>
                    <input
                        {...register("email")}
                        type="text"
                        placeholder="Email address*"
                        className="text-[18px] w-full h-[45px] bg-default border border-bdColor rounded-[3px] px-[9px] outline-none focus:outline-[white]"
                    />
                    <p
                        ref={refPasswdMsg}
                        className="text-[15px] text-[red] hidden"
                    >
                        password can not be less than 8 characters*
                    </p>
                    <input
                        {...register("passwd")}
                        type="password"
                        placeholder="Password*"
                        className="text-[18px] w-full h-[45px] bg-default border border-bdColor rounded-[3px] px-[9px]"
                    />
                    <button className="w-full h-[45px] text-center text-[black] bg-[white] rounded-[3px] hover:opacity-90 text-[18px]">
                        {mutation.isPending ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="text-[white] text-[15px]">
                    Don't have an account?
                </p>
                <button className="w-full h-[45px] text-center text-[white] bg-[black] border border-[white] rounded-[3px] hover:opacity-90 text-[18px] hover:bg-default">
                    <i className="fa-brands fa-google mr-[10px]"></i> Continue
                    with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
