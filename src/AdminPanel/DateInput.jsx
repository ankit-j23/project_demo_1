import React from "react";
import "./DateInput.scss";
const DateInput = ({ label, value, onChange }) => {
  return (
    <div className="date-input-wrapper">
      <input
        type="date"
        className="date-input-field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateInput;
