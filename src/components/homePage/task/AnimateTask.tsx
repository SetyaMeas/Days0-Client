import { useEffect, useState } from "react";

const AnimateTask = ({
    day,
    hour,
    minute,
    second,
    task,
}: {
    day: number;
    hour: number;
    minute: number;
    second: number;
    task: string;
}) => {
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

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-[white]">
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

export default AnimateTask;
