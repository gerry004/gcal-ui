import { useEffect, useMemo } from "react";
import { calculateEventDurationInHours } from "../utils/events";

const EventsList = ({ events, colors, setSumOfDurationsInHours, searchString }) => {
  const sumOfDurationsInHours = (events) => {
    return events.reduce((acc, event) => acc + calculateEventDurationInHours(event), 0);
  }

  const filteredAndSortedEvents = useMemo(() => {
    return [...events]
      .filter((event) => event.summary.toLowerCase().includes(searchString.toLowerCase()))
      .sort((a, b) => calculateEventDurationInHours(b) - calculateEventDurationInHours(a))
  }, [events, searchString]);

  useEffect(() => {
    setSumOfDurationsInHours(sumOfDurationsInHours(filteredAndSortedEvents));
  }, [filteredAndSortedEvents, setSumOfDurationsInHours]);

  return (
    <>
      {filteredAndSortedEvents.map((event) => (
        <div key={event.id} className='border rounded-lg p-2 m-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span
                className='rounded-full p-4'
                style={{ backgroundColor: colors[event.colorId]?.background }}>
              </span>
              <span className='p-2'>{event.summary}</span>
            </div>
            <span className='p-2'>{calculateEventDurationInHours(event) || 0} hours</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default EventsList;