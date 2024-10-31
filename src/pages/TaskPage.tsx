import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useError } from "../GlobalErrorHandling";
import SpinnerLoading from "../components/SpinnerLoading";
import TaskListItem from "../components/homePage/task/TaskListItem";
import TaskDetail from "../components/homePage/task/TaskDetail";
import CreateTask from "../components/homePage/task/CreateTask";

interface ITask {
    userId: number;
    taskId: number;
    task: string;
    startedDate: string;
}
export interface ITaskDetail {
    day: number;
    hour: number;
    minute: number;
    second: number;
    taskId: number;
    task: string;
}

const api = import.meta.env.VITE_API;

const TaskPage = () => {
    const [date, setStartedDate] = useState<ITaskDetail | null>(null);
    const { setErrValue } = useError();

    async function fetchGetAllTasks(): Promise<ITask[] | null> {
        const res = await fetch(`${api}/api/task/all`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            if (res.status == 401) {
                setErrValue({
                    status: "failed",
                    msg: "Login Expired",
                    code: 401,
                });
                return null;
            } else {
                setErrValue({
                    status: "failed",
                    msg: "Something went wrong",
                    code: 500,
                });
                return null;
            }
        }
        return await res.json();
    }

    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["task_detail"],
        queryFn: fetchGetAllTasks,
    });

    useEffect(() => {
        if (isError) {
            setErrValue({
                code: 500,
                msg: "Something went wrong",
                status: "failed",
            });
        }
    }, [isError]);

    const reFetchTask = async () => {
        await refetch();
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div
                id="left-side-bar"
                className="w-[400px] border-r-bdColor border-r-[1px] bg-default h-full p-[10px] flex flex-col items-center gap-[12px] overflow-y-hidden"
            >
                <CreateTask refetchTask={reFetchTask} />

                <hr className="bg-bdColor w-full h-[3px]" />

                <ol className="h-full list-decimal text-[18px] w-full text-[white] list-inside">
                    {isLoading ? (
                        <div className="w-full flex justify-center h-full items-center">
                            <SpinnerLoading bg="white" />
                        </div>
                    ) : null}

                    {data ? (
                        data.length === 0 ? (
                            <p className="w-full text-center text-[white] text-[15px]">
                                no task
                            </p>
                        ) : (
                            data.map((i) => (
                                <TaskListItem
                                    key={i.taskId}
                                    taskId={i.taskId}
                                    task={i.task}
                                    startedDate={i.startedDate}
                                    toggleTaskDetail={(date: ITaskDetail) => {
                                        setStartedDate(date);
                                    }}
                                />
                            ))
                        )
                    ) : null}
                </ol>
            </div>

            <div id="right-side-bar" className="w-full h-full">
                {date ? (
                    <TaskDetail
                        day={date.day}
                        hour={date.hour}
                        minute={date.minute}
                        second={date.second}
                        taskId={date.taskId}
                        task={date.task}
                    />
                ) : (
                    <div className="w-full h-full flex justify-center items-center text-[white]">
                        <p className="text-[18px]">no task selected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskPage;
