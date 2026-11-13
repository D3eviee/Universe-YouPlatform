'use client';
import { format } from "date-fns";

type TimeSelectProps = {
    selectedDate: Date, 
    onChange: (date: Date) => void;
}

export const TimeSelect = ({onChange, selectedDate}:TimeSelectProps) => {
    const day = format(selectedDate, "yyyy-MM-dd");
    const time = format(selectedDate, "HH:mm");
    
    // "2026-11-11T14:30" (no Z) is parsed as *local* time
    const update = (nextDay: string, nextTime: string) => {
        if (!nextDay || !nextTime) return;
        const next = new Date(`${nextDay}T${nextTime}`);
        if (!Number.isNaN(next.getTime())) onChange(next);
    };

    return (
        <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-col gap-2 w-fit">
                <label htmlFor="publishDate" className="text-gray-400 font-light tracking-wider text-xs uppercase">Publish day</label> 
                <input
                    id="publishDate"
                    value={day}
                    type="date"
                    className="p-2 rounded-md text-white bg-[#242427] [&::-webkit-calendar-picker-indicator]:invert"
                    onChange={(e) => update(e.target.value, time)}
                />
            </div>
            <div className="flex flex-col gap-2 w-fit">
                <label htmlFor="publishTime" className="text-gray-400 font-light tracking-wider text-xs uppercase">Publish time</label> 
                <input
                    id="publishTime"
                    value={time}
                    type="time"
                    onChange={(e) => update(day, e.target.value)}
                    className="p-2 rounded-md text-white   w-fit bg-[#242427] [&::-webkit-calendar-picker-indicator]:invert" 
                />
            </div>
        </div>
    );
}