import { useState } from "react";
import { ITaskDetail } from "../../../pages/TaskPage";
import AnimateTask from "./AnimateTask";

const DeleteTask = ({ taskId }: { taskId: number }) => {
    const [showDeleteBtn, setShowDeleteBtn] = useState(true);

    // TODO: finish delete task
    async function deletingTask() {
        const api = import.meta.env.VITE_API;
        const res = await fetch(`${api}/api/task/${taskId}`, {
            method: "DELETE",
            credentials: "include",
        });
        return res.status;
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
                    <button className="h-[30px] w-[80px] bg-[red] rounded-[2px]">
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

const TaskDetail = ({
    day,
    hour,
    minute,
    second,
    taskId,
    task,
}: ITaskDetail) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-[white]">
            <DeleteTask taskId={taskId} />

            <AnimateTask
                task={task}
                day={day}
                hour={hour}
                minute={minute}
                second={second}
            />
        </div>
    );
};

export default TaskDetail;
