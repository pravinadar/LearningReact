import React from 'react'

function SelectComponent({
  options,
  label,
  className = "",
  ...props
}, ref) {
  const id = useId();
  return (
    <div>
      <div className={`w-full`}>
        {label && <label htmlFor={id} className=''></label>}
        <select
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          ref={ref}
          id={id}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default React.forwardRef(SelectComponent)
// method 2 for forwardRef
