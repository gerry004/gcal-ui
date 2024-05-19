import { useState, useEffect } from "react";
import TextInput from "./TextInput";

const Colors = ({ colors, updateColors }) => {
  const [labelValues, setLabelValues] = useState({});

  useEffect(() => {
    const labelValues = {};

    if (colors) {
      Object.keys(colors).forEach((colorId) => {
        if (colors[colorId].label) {
          labelValues[colorId] = colors[colorId].label;
        }
        else {
          labelValues[colorId] = colorId;
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

  if (!colors) return null;

  return (
    <div className='flex flex-col'>
      {Object.keys(colors).map((colorId) => {
        return (
          <div className='' key={colorId}>
            <TextInput
              value={labelValues[colorId] || ''}
              onChange={(value) => handleChange(colorId, value)}
              onBlur={() => updateColors(colorId, 'label', labelValues[colorId])}
              backgroundColor={colors[colorId]?.background}
            >
            </TextInput>
          </div>
        );
      })}
    </div>
  );
}

export default Colors;
