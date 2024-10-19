import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useError } from "../GlobalErrorHandling";

const TaskListItem = ({ task, taskId }: { task: string; taskId: number }) => {
    return (
        <li className="w-full break-words truncate py-[2px]">
            <Link to={`${taskId}`} className="hover:underline">
                {task}
            </Link>
        </li>
    );
};

interface ITask {
    userId: number;
    taskId: number;
    task: string;
    startedDate: Date;
}

const api = import.meta.env.VITE_API;

const TaskPage = () => {
    async function fetchGetAllTasks() {
        const res = await fetch(`${api}/api/task/all`, {
            method: "GET",
            credentials: "include",
        });
        return res;
    }
    const { data, isError } = useQuery({
        queryKey: ["task_getall"],
        queryFn: fetchGetAllTasks,
    });

    const { setErrorValue } = useError();

    const displayTask = async () => {
        // TODO: fix this, please
        if (data) {
            const tasks: ITask[] = await data.json();
            return tasks.map((item) => (
                <TaskListItem taskId={item.taskId} task={item.task} />
            ));
        }
    };

    useEffect(() => {
        if (isError) {
            setErrorValue({ status: 500, message: "" });
        }
        (async () => {
            if (data) {
                const me: ITask[] = await data.json();
                me.forEach((e) => console.log(e));
            }
        })();
    }, [isError, data]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div
                id="left-side-bar"
                className="w-[400px] border-r-bdColor border-r-[1px] bg-default h-full p-[10px] flex flex-col items-center gap-[12px] overflow-y-hidden"
            >
                <form className="w-full h-[36px] flex justify-between text-[white] gap-[6px]">
                    <input
                        type="text"
                        placeholder="Enter task"
                        className="w-full h-full text-[15px] text-[white] px-[6px] outline-none border-bdColor border bg-default rounded-[3px] focus:border-[#00990f]"
                    />
                    <button className="w-[80px] px-[6px] bg-[#00990f] h-full text-[15px] rounded-[2px] hover:opacity-90">
                        + New
                    </button>
                </form>
                <hr className="bg-bdColor w-full h-[3px]" />
                <ol className="h-full list-decimal text-[18px] w-full text-[white] list-inside">
                    {data ? displayTask : "hello world"}
                </ol>
            </div>

            <div id="right-side-bar" className="w-full h-full">
                <div className="w-full h-full flex flex-col items-center justify-center text-[white]">
                    <p className="text-[55px] font-bold">
                        Day 101{" "}
                        <span className="text-[15px] font-normal">
                            12h 34m 59s
                        </span>
                    </p>
                    <p className="text-[35px] font-bold">being a good person</p>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;
