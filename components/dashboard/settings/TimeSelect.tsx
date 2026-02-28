'use client'
import useArticleEditorStore from "@/store/ArticleEditorStore";
import {setHours, setMinutes} from "date-fns"

type TimeSelectProps = {
    selectedDate: Date | null | undefined, 
    onChange: (date: Date) => void;
}

const TimeSelect = ({onChange, selectedDate}:TimeSelectProps) => {
    const publishedAt = useArticleEditorStore(store => store.activeArticle.publishedAt)
    const [day, time] = publishedAt.toJSON().split("T")
    const timeFormatted = time.slice(0, 5)

    const handleDateChange = (date: string) => {
        const formattedDate = new Date(date)
        onChange(formattedDate)
    }

    const handleTimeChange = (stringTime: string) => {
        const [hours, minutes] = stringTime.split(":")
        if(selectedDate == null ) return 
        const updatedHoursDate = setHours(selectedDate, parseInt(hours))
        const fullyUpdatedDate = setMinutes(updatedHoursDate, parseInt(minutes))
        onChange(fullyUpdatedDate)
    }

    return (
        <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-col gap-2 w-fit">
                <label htmlFor="publishDate" className="text-gray-400 font-light tracking-wider text-xs uppercase">Publish time</label> 
                <input
                    value={day}
                    id="publishDate"
                    className="p-2 rounded-md text-white bg-[#242427] [&::-webkit-calendar-picker-indicator]:invert"
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                />
            </div>
            {selectedDate &&
                <div className="flex flex-col gap-2 w-fit">
                    <label htmlFor="publishTime" className="text-gray-400 font-light tracking-wider text-xs uppercase">Publish time</label> 
                    <input
                        value={timeFormatted}
                        id="publishTime"
                        className="p-2 rounded-md text-white   w-fit bg-[#242427] [&::-webkit-calendar-picker-indicator]:invert" 
                        type="time"
                        onChange={(e) => handleTimeChange(e.target.value)}
                    />
                </div>
            }
        </div>
    );
}

export default TimeSelect