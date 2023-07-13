import React, { useMemo } from 'react'

const Schedule = ({
    name
}) => {
  const memorized = useMemo(() => {
    return { name }
  }, [name])
  
  return (
    <li>{ memorized.name }</li>
  )
}

export default React.memo(Schedule)