import { ITaskDetail } from "../../../pages/TaskPage";

const TaskListItem = ({
    task,
    taskId,
    startedDate,
    toggleTaskDetail,
}: {
    task: string;
    taskId: number;
    startedDate: string;
    toggleTaskDetail: (date: ITaskDetail) => void;
}) => {
    function transferData() {
        const currentDate = new Date();
        const convertedDate = new Date(startedDate);

        /*
         * normal date is ahead 7 hours from UTC date
         */
        const totalMilliseconds =
            currentDate.getTime() -
            convertedDate.getTime() -
            1000 * 60 * 60 * 7;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        /*
         * `r`: stand for "remaining"
         */
        const rHour = Math.floor(totalHours % 24);
        const rMinute = Math.floor(totalMinutes % 60);
        const rSecond = Math.floor(totalSeconds % 60);

        toggleTaskDetail(
            {
                day: totalDays,
                hour: rHour,
                minute: rMinute,
                second: rSecond,
                taskId,
                task,
            },
        );
    }

    return (
        <li className="w-full break-words truncate py-[2px]">
            <p
                role="button"
                onClick={transferData}
                className="hover:underline inline"
            >
                {task}
            </p>
        </li>
    );
};

export default TaskListItem;
