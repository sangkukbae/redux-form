import React from "react";

export const Text = ({ label, input, meta }) => {
  console.log("inputStuff: ", input);
  return (
    <div className="mv4 w-100">
      <div className="b sans-serif pv2 w-100">{label}</div>
      <div>
        <input
          {...input}
          placeholder={label}
          type="text"
          className="pa2 ba b--black-40 w-100"
        />
        {meta && meta.error && meta.touched && (
          <div className="sans-serif red">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default Text;
