import React from 'react';

export const Slider = ({ min, max, step, value, onValueChange, className = '' }) => {
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onValueChange([newValue]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${className}`}
      style={{
        '--range-shdw': 'var(--accent)',
        background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(value[0] - min) / (max - min) * 100}%, #374151 ${(value[0] - min) / (max - min) * 100}%, #374151 100%)`
      }}
    />
  );
};
