import React from "react"

const InputGroup = ({ className, type, placeholder, value, error, setValue }) => {
  return (
    <div className={className}>
      <input
          type={type}
          className='w-full p-2  border border-[#999]'    
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          autoComplete="on"
      />
      <small className='fopt-medium text-red-500'>
        { error }
      </small>
    </div>
  )
}

export default React.memo(InputGroup)