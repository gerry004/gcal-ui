import { useMemo } from "react";
import Calendars from "./Calendars";
import Colors from "./Colors";

const Divider = () => {
  return <hr className="border-t border-gray-300 m-2" />;
};

const Sidebar = ({
  calendars,
  colors,
  updateCalendars,
  updateColors,
}) => {
  const ownedCalendars = useMemo(() => calendars.filter(calendar => calendar.accessRole === 'owner'), [calendars]);
  const readOnlyCalendars = useMemo(() => calendars.filter(calendar => calendar.accessRole === 'reader'), [calendars]);

  const filteredKeysWithLabel = (obj) => {
    const result = {};
    Object.keys(obj).forEach(key => {
      if (obj[key].label) {
        result[key] = obj[key];
      }
    });
    return result;
  };

  const filteredKeysWithoutLabel = (obj) => {
    const result = {};
    Object.keys(obj).forEach(key => {
      if (!obj[key].label) {
        result[key] = obj[key];
      }
    });
    return result;
  };

  const labeledColors = useMemo(() => filteredKeysWithLabel(colors), [colors]);
  const unlabeledColors = useMemo(() => filteredKeysWithoutLabel(colors), [colors]);

  return (
    <div className="flex flex-col w-1/4 min-h-screen bg-gray-100">
      <h2 className="text-lg font-semibold p-4">Calendars</h2>
      <div className="px-2">
        <Calendars
          calendars={ownedCalendars}
          colors={colors}
          updateCalendars={updateCalendars}
        />
        <Divider />
        <Calendars
          calendars={readOnlyCalendars}
          colors={colors}
          updateCalendars={updateCalendars}
        />
      </div>
      <Divider />
      <h2 className="text-lg font-semibold p-4">Color Labels</h2>
      <div className='px-4 mb-4'>
        <Colors
          colors={labeledColors}
          updateColors={updateColors}
        />
        <Colors
          colors={unlabeledColors}
          updateColors={updateColors}
        />
      </div>
    </div>
  );
}

export default Sidebar;