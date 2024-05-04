// colors = {
// id: { background: #00000, foreground: #00000 },
// ...
// }

const Colors = ({ className, colors }) => {
  return (
    <div className={className}>
      {colors && Object.entries(colors).map(([colorName, rgbValue]) => (
        <span
          key={colorName}
          className='min-w-6 min-h-6 rounded-full'
          style={{backgroundColor: rgbValue.background}}
        ></span>
      ))}
    </div>
  )
};

export default Colors;
