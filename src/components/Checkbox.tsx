import React from 'react';

interface CheckboxProps {
    id: String,
    checked: boolean, 
    onChange: () => void
    label: String
}

function Checkbox({id, checked, onChange, label} : CheckboxProps){
  return (
    <label className="form-checkbox-label">
        <input
          id={id}
          type="checkbox"
          className="form-checkbox"
          checked={checked}
          onChange={(e) => onChange((e.target.checked))}
          />
        <span className="form-checkbox-span">{label}</span>
    </label>
  )
}

export default Checkbox