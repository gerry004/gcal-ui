const TextInput = ({ value, onChange, onBlur, backgroundColor }) => {
  return (
    <input
      className='border border-black p-2 my-1 rounded-lg'
      type='text'
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      style={{ backgroundColor }}
    />
  );
};

export default TextInput;