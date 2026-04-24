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
    <div>
        <input
          id={id}
          type="checkbox"
          className="form-checkbox"
          checked={checked}
          onChange={(e) => onChange((e.target.checked))}
          />
        <label htmlFor={id} className="form-checkbox-label">{label}</label>
    </div>
  )
}

export default Checkbox