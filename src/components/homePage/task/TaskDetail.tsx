import { useEffect, useRef, useState } from "react";
import { ITaskDetail } from "../../../pages/TaskPage";
// TODO: seperate delete and show task detail
const TaskDetail = ({
    day,
    hour,
    minute,
    second,
    taskId,
    task,
}: ITaskDetail) => {
    const [totalDay, setTotalDay] = useState(0);
    const [rHour, setRhour] = useState(0);
    const [rMinute, setRminute] = useState(0);
    const [rSecond, setRsecond] = useState(0);

    useEffect(() => {
        setTotalDay(day);
        setRhour(hour);
        setRminute(minute);
        setRsecond(second);
    }, [second]);

    useEffect(() => {
        const increaseSecond = setInterval(() => {
            setRsecond((s) => {
                if (s == 59) {
                    s = 0;
                    setRminute((m) => {
                        if (m == 59) {
                            m = 0;
                            setRhour((h) => {
                                if (h == 23) {
                                    h = 0;
                                    setTotalDay((d) => (d += 1));
                                } else {
                                    h += 1;
                                }
                                return h;
                            });
                        } else {
                            m += 1;
                        }
                        return m;
                    });
                } else {
                    s += 1;
                }
                return s;
            });
        }, 1000);

        return () => clearInterval(increaseSecond);
    }, []);

    const formatValue = (time: number) => {
        if (time < 10) {
            return `0${time}`;
        }
        return time;
    };

    const refDeleteOpts = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-[white]">
            <div className="flex flex-row-reverse w-full text-[white] px-[15px] py-[15px] gap-[15px]">
                <button
                    onClick={() => {
                        if (refDeleteOpts.current) {
                            if (
                                refDeleteOpts.current.style.visibility ===
                                "hidden"
                            ) {
                                refDeleteOpts.current.style.opacity = "1";
                                refDeleteOpts.current.style.visibility =
                                    "visible";
                            } else {
                                refDeleteOpts.current.style.opacity = "0";
                                refDeleteOpts.current.style.visibility =
                                    "hidden";
                            }
                        }
                    }}
                    className="h-[40px] w-[40px] rounded-[2px] bg-[red] hover:opacity-90"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
                <div
                    ref={refDeleteOpts}
                    className="rounded-l-[2px] flex gap-[15px] h-full items-center duration-150 opacity-0 invisible"
                >
                    <button className="h-[30px] w-[80px] border text-[green] border-[green] rounded-[2px]">
                        <i className="fa-solid fa-check mr-[10px]"></i>
                        Yes
                    </button>
                    <button className="h-[30px] w-[80px] border text-[red] border-[red] rounded-[2px]">
                        <i className="fa-solid fa-cancel mr-[10px]"></i>
                        No
                    </button>
                </div>
            </div>
            <div className="text-[white] flex flex-col h-full justify-center items-center">
                <div className="flex gap-[10px]">
                    <p className="text-[55px] font-bold">
                        {`Day ${totalDay} `}
                    </p>
                    <p className="text-[15px] h-[27px] px-[6px] bg-default border text-center  border-bdColor mt-[22px] rounded-[2px]">{`${formatValue(rHour)}h ${formatValue(rMinute)}m ${formatValue(rSecond)}s`}</p>
                </div>
                <p className="text-[35px] font-bold">{task}</p>
            </div>
        </div>
    );
};

export default TaskDetail;
