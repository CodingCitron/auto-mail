import React from "react"

const InputGroup = ({ className, type, name, placeholder, value, error, setValue }) => {
  return (
    <div className={className}>
      <input
          type={type}
          className='w-full p-2  border border-[#999] outline-none'    
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={setValue}
          autoComplete="on"
      />
      <small className='fopt-medium text-red-500'>
        { error }
      </small>
    </div>
  )
}

export default React.memo(InputGroup)