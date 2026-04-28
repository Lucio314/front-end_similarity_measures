import React from 'react';

/**
 * @param {String} id 
 * @param {boolean} checked
 * @param {Function} onChange 
 * @param {String} label 
 * @returns 
 */
function Checkbox({id, checked, onChange, label}){
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