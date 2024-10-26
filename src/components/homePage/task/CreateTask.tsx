import { useForm } from "react-hook-form";
import { useError } from "../../../GlobalErrorHandling";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API;

const CreateTask = ({ refetchTask }: { refetchTask: () => Promise<void> }) => {
    const { register, reset, handleSubmit } = useForm<{ task: string }>();
    const { setErrorValue } = useError();
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
                alert("task can't be empty");
            } else if (res.status === 401) {
                setErrorValue({ status: 401, message: "" });
            } else {
                setErrorValue({ status: 500, message: "" });
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
                className="w-[80px] px-[6px] bg-[#00990f] h-full text-[15px] rounded-[2px] hover:opacity-90"
            >
                + New
            </button>
        </form>
    );
};

export default CreateTask;
