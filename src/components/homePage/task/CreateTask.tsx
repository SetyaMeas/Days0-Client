import { useForm } from "react-hook-form";
import { useErrorContext } from "../../../GlobalErrorHandling";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../utils/Spinner";

const api = import.meta.env.VITE_API;

const CreateTask = ({ refetchTask }: { refetchTask: () => Promise<void> }) => {
    const { register, reset, handleSubmit } = useForm<{ task: string }>();
    const { setErrValue } = useErrorContext();
    const mutation = useMutation({
        mutationKey: ["create-task"],
        mutationFn: fetchCreateTask,
        onSuccess: async () => {
            await refetchTask();
        },
    });

    async function fetchCreateTask(body: { task: string }) {
        const res = await fetch(`${api}/api/task`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
        });

        if (!res.ok) {
            if (res.status === 400) {
                setErrValue({
                    status: "warning",
                    msg: "Task can't be empty",
                    code: 400,
                });
            } else if (res.status === 401) {
                setErrValue({
                    status: "failed",
                    msg: "Login Expired",
                    code: 401,
                });
            } else if (res.status === 429) {
                setErrValue({
                    status: "warning",
                    msg: "Task limit is 15",
                    code: 400,
                });
            } else {
                setErrValue({
                    status: "failed",
                    msg: "Something went wrong",
                    code: 500,
                });
            }
            return;
        }

        return await res.json();
    }
    const onSubmitform = async (form: { task: string }) => {
        if (form.task.trim().length != 0) {
            await mutation.mutateAsync(form);
            reset();
            await refetchTask();
        }
    };
    return (
        <form
            className="w-full h-[36px] flex justify-between text-[white] gap-[6px]"
            onSubmit={handleSubmit(onSubmitform)}
        >
            <input
                {...register("task")}
                type="text"
                placeholder="Enter task"
                className="w-full h-full text-[15px] text-[white] px-[6px] outline-none border-bdColor border bg-default rounded-[3px] focus:border-[#00990f]"
                autoComplete="off"
            />
            <button
                disabled={mutation.isPending}
                className="w-[90px] bg-myGreen h-full text-[15px] rounded-[2px] hover:opacity-90 flex justify-center items-center"
            >
                {mutation.isPending ? (
                    <Spinner
                        size="15px"
                        borderWidth="2px"
                        borderColor="white"
                        borderTopColor="gray"
                    />
                ) : (
                    "+ New"
                )}
            </button>
        </form>
    );
};

export default CreateTask;
