import { ITaskDetail } from "../../../pages/TaskPage";
import AnimateTask from "./AnimateTask";
import DeleteTask from "./DeleteTask";

const TaskDetail = ({
    day,
    hour,
    minute,
    second,
    taskId,
    task,
    refetchTask,
    unSelectTask
}: ITaskDetail) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-[white]">
            <DeleteTask taskId={taskId} refetchTask={refetchTask} unSelectTask={unSelectTask} />

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
