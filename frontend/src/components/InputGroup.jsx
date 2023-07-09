const InputGroup = ({ className, type, placeholder, value, error, setValue }) => {
  return (
    <div className={className}>
      <input 
          type={type}
          className='w-full'    
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
      />
      <small className='fopt-medium text-red-500'>
          {error}
      </small>
  </div>
  )
}

export default InputGroup