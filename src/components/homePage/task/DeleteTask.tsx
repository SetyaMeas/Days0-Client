import { useState } from "react";
import { useErrorContext } from "../../../GlobalErrorHandling";
import { useMutation } from "@tanstack/react-query";

const DeleteTask = ({
    taskId,
    refetchTask,
    unSelectTask,
}: {
    taskId: number;
    refetchTask: () => Promise<void>;
    unSelectTask: () => void;
}) => {
    const { setErrValue } = useErrorContext();
    const [showDeleteBtn, setShowDeleteBtn] = useState(true);
    const deleteTaskMutation = useMutation({
        mutationFn: deletingTask,
        mutationKey: ["delete-task"],
    });

    async function deletingTask() {
        const api = import.meta.env.VITE_API;
        const res = await fetch(`${api}/api/task/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        });
        return res.status;
    }

    async function handleDeletingTask() {
        try {
            const statusCode = await deleteTaskMutation.mutateAsync();
            if (statusCode === 401) {
                setErrValue({
                    status: "failed",
                    code: 401,
                    msg: "Login Expired",
                });
            } else if (statusCode === 200) {
                setErrValue({
                    status: "success",
                    code: 200,
                    msg: "Deleted task",
                });

                await refetchTask();
                unSelectTask();
            } else if (statusCode === 404) {
                await refetchTask();
                unSelectTask();
            } else {
                throw new Error("");
            }
        } catch (error) {
            setErrValue({
                status: "failed",
                code: 500,
                msg: "Something went wrong",
            });
        }
    }

    return (
        <div className="flex flex-row-reverse w-full text-[white] px-[15px] py-[15px] gap-[15px]">
            {showDeleteBtn ? (
                <button
                    onClick={() => {
                        setShowDeleteBtn(false);
                    }}
                    className="h-[40px] w-[40px] rounded-[2px] bg-[red] hover:opacity-90 duration-150"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            ) : null}

            {showDeleteBtn ? null : (
                <div className="rounded-l-[2px] flex gap-[15px] h-[40px] items-center duration-150">
                    <button
                        disabled={deleteTaskMutation.isPending}
                        className="h-[30px] w-[80px] bg-[red] rounded-[2px]"
                        onClick={handleDeletingTask}
                    >
                        <i className="fa-solid fa-check mr-[10px]"></i>
                        Yes
                    </button>

                    <button
                        onClick={() => {
                            setShowDeleteBtn(true);
                        }}
                        className="h-[30px] w-[80px] text-[white] rounded-[2px] bg-myGreen"
                    >
                        <i className="fa-solid fa-cancel mr-[10px]"></i>
                        No
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteTask;
