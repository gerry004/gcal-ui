// const data = {
//   colorId, { hours, minutes },
//   ...
// }

const Legend = ({ data, colors }) => {
  console.log({ data, colors })
  return (
    <div>
      {Object.keys(data).map((colorId) => {
        const { hours, minutes } = data[colorId];
        return (
          <div className='flex gap-2' key={colorId}>
            <span
              className='rounded-full min-h-12 min-w-12'
              style={{ backgroundColor: colors[colorId].background }}>
            </span>
            <span>{hours}h {minutes}m</span>
          </div>
        );
      })}
    </div>
  );
}

export default Legend;
