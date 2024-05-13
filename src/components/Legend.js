// const data = {
//   colorId, { hours, minutes },
//   ...
// }

import { useMemo } from "react";
import { transformEventsToTimeSpentObject } from "../utils/events";

const Legend = ({ events, colors }) => {

  const timeSpentByColor = useMemo(() => {
    if (events) {
      return transformEventsToTimeSpentObject(events);
    }
    return {};
  }, [events]);

  return (
    <div className='border rounded-lg inline-flex border-black flex-col p-2'>
      {Object.keys(timeSpentByColor).map((colorId) => {
        const { hours, minutes } = timeSpentByColor[colorId];
        return (
          <div className='flex items-center gap-2' key={colorId}>
            <span
              className='rounded-full p-4'
              style={{ backgroundColor: colors[colorId]?.background }}>
            </span>
            <span className='p-2'>{hours} hours {minutes} minutes</span>
          </div>
        );
      })}
    </div>
  );
}

export default Legend;
