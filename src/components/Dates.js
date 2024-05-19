import Timeframe from "./Timeframe"
import DatePicker from "./DatePicker"
import {
  formatDate,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  getLastWeekStart, getLastWeekEnd, getNextWeekStart, getNextWeekEnd, 
  getLastMonthStart, getLastMonthEnd,getNextMonthStart, getNextMonthEnd, 
  yesterday, tomorrow
} from '../utils/relativeTime';
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

  const previous = () => {
    switch (timeframe) {
      case 'Week':
        setStartDate(getLastWeekStart(startDate));
        setEndDate(getLastWeekEnd(startDate));
        break;
      case 'Month':
        setStartDate(getLastMonthStart(startDate));
        setEndDate(getLastMonthEnd(startDate));
        break;
      case 'Day':
        setStartDate(yesterday(startDate));
        setEndDate(yesterday(endDate));
      default:
        break;
    }
  }

  const next = () => {
    switch (timeframe) {
      case 'Week':
        setStartDate(getNextWeekStart(startDate));
        setEndDate(getNextWeekEnd(startDate));
        break;
      case 'Month':
        setStartDate(getNextMonthStart(startDate));
        setEndDate(getNextMonthEnd(startDate));
        break;
      case 'Day':
        setStartDate(tomorrow(startDate));
        setEndDate(tomorrow(endDate));
      default:
        break;
    }
  }

  return (
    <div className='flex justify-between items-center p-2 m-2'>
      <div className='flex gap-2'>
        <DatePicker id='start-date' label='Start Date' date={startDate} setDate={setStartDate} />
        <DatePicker id='end-date' label='End Date' date={endDate} setDate={setEndDate} />
      </div>
      <div className='flex m-1 rounded-full items-center'>
        <Timeframe timeframe={timeframe} setTimeframe={setTimeframe} previous={previous} next={next} />
      </div>
    </div>
  )
}

export default Dates;