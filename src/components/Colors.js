const Colors = ({ className, colors, onClickColor }) => {
  return (
    <div className={className}>
      {colors && Object.entries(colors).map(([colorId, rgbValue]) => (
        <button
          key={colorId}
          className='min-w-6 min-h-6 rounded-full'
          style={{backgroundColor: rgbValue.background}}
          onClick={() => onClickColor(colorId)}
        ></button>
      ))}
    </div>
  )
};

export default Colors;
