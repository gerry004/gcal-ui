const TextInput = ({ value, onChange, onBlur, backgroundColor }) => {
  return (
    <input
      className='border border-black focus:ring focus:ring-blue-400 p-2 m-2 rounded-lg'
      type='text'
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      style={{ backgroundColor }}
    />
  );
};

export default TextInput;