import Timeframe from "./Timeframe"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {
  formatDate,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  getLastWeekStart, getLastWeekEnd, getNextWeekStart, getNextWeekEnd,
  getLastMonthStart, getLastMonthEnd, getNextMonthStart, getNextMonthEnd,
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
        break;
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
        break;
      default:
        break;
    }
  }

  return (
    <div className='flex justify-between items-center py-2 m-2'>
      <div className='flex gap-2'>
        <div className='flex flex-col'>
        <span className='p-1 text-sm text-gray-600 font-semibold'>Start Date:</span>
          <DatePicker
            selected={startDate}
            className="border border-gray-300 p-2 rounded"
            onChange={(date) => setStartDate(date.toISOString().split('T')[0])}
            dateFormat="dd MMM yyyy" />
        </div>
        <div className='flex flex-col'>
          <span className='p-1 text-sm text-gray-600 font-semibold'>End Date:</span>
          <DatePicker
            selected={endDate}
            className="border border-gray-300 p-2 rounded"
            onChange={(date) => setEndDate(date.toISOString().split('T')[0])}
            dateFormat="dd MMM yyyy" />
        </div>
      </div>
      <div className='flex m-1 rounded-full items-center'>
        <Timeframe timeframe={timeframe} setTimeframe={setTimeframe} previous={previous} next={next} />
      </div>
    </div>
  )
}

export default Dates;