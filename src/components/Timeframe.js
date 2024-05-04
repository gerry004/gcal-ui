import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const Timeframe = ({ timeframe, setTimeframe }) => {
  return (
    <div className="flex items-center p-2">
      <FaArrowLeft className="text-gray-600" />

      <button
        className={`p-2 border rounded-l-lg ${timeframe === 'Day'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setTimeframe('Day')}
      >
        Day
      </button>

      <button
        className={`p-2 border ${timeframe === 'Week'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setTimeframe('Week')}
      >
        Week
      </button>

      <button
        className={`p-2 border rounded-r-lg ${timeframe === 'Month'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setTimeframe('Month')}
      >
        Month
      </button>

      <FaArrowRight className="text-gray-600" />
    </div>
  );
};

export default Timeframe;
