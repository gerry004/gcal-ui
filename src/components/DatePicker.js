const DatePicker = ({ id, label, date, setDate }) => {
  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-600"
      >
        {label}
      </label>
      <input
        type="date"
        id={id}
        className="p-2 border rounded"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
    </div>
  );
}

export default DatePicker;