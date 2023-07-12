import React, { useEffect } from 'react'

// function areEqual(prev, next) {
//   console.log(prev, next)

//   return true
// }

const Schedule = ({
    name
}) => {
  useEffect(() => {
    console.log('Schedule 재렌더')
  })

  return (
    <li>{ name }</li>
  )
}

export default React.memo(Schedule)