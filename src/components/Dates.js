import Timeframe from "./Timeframe"
import DatePicker from "./DatePicker"
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, formatDate } from '../utils/relativeTime';
import { useEffect } from "react";


const Dates = ({
  startDate,
  endDate,
  timeframe,
  setTimeframe,
  setStartDate,
  setEndDate
}) => {
  useEffect(() => {
    const today = new Date();
    switch (timeframe) {
      case 'Month':
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        break;
      case 'Day':
        setStartDate(formatDate(today));
        setEndDate(formatDate(today));
        break;
      default:
      case 'Week':
        setStartDate(startOfWeek(today));
        setEndDate(endOfWeek(today));
        break;
    }
  }, [timeframe, setStartDate, setEndDate]);

  return (
    <div className='flex justify-between items-center p-2 m-2'>
      <div className='flex gap-2'>
        <DatePicker id='start-date' label='Start Date' date={startDate} setDate={setStartDate} />
        <DatePicker id='end-date' label='End Date' date={endDate} setDate={setEndDate} />
      </div>
      <div className='flex m-1 rounded-full items-center'>
        <Timeframe timeframe={timeframe} setTimeframe={setTimeframe} />
      </div>
    </div>
  )
}

export default Dates;