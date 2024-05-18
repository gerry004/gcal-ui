import { useMemo, useState, useEffect } from "react";
import { transformEventsToTimeSpentObject } from "../utils/events";
import TextInput from "./TextInput";

const Legend = ({ events, colors, updateColors }) => {
  const [labelValues, setLabelValues] = useState({});

  useEffect(() => {
    const labelValues = {};

    if (colors) {
      Object.keys(colors).forEach((colorId) => {
        if (colors[colorId].label) {
          labelValues[colorId] = colors[colorId].label;
        }
      });
    }

    setLabelValues(labelValues);
  }, [colors]);

  const handleChange = (colorId, value) => {
    setLabelValues({
      ...labelValues,
      [colorId]: value,
    });
  };

  const timeSpentByColor = useMemo(() => {
    if (events) {
      return transformEventsToTimeSpentObject(events);
    }
    return {};
  }, [events]);

  return (
    <div className='border rounded-lg inline-flex border-black flex-col p-2'>
      {Object.keys(timeSpentByColor).map((colorId) => {
        return (
          <div className='flex items-center gap-2' key={colorId}>
            <TextInput
              value={labelValues[colorId] || ''}
              onChange={(value) => handleChange(colorId, value)}
              onBlur={() => updateColors(colorId, 'label', labelValues[colorId])}
              backgroundColor={colors[colorId]?.background}
            >
            </TextInput>
            <span className='p-2'>{timeSpentByColor[colorId]} hours</span>
          </div>
        );
      })}
    </div>
  );
}

export default Legend;
