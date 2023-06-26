import React from 'react'

const ConditionalRendering = (props: any) => {
  const { isLoggedIn } = props;

  return (
    <div>
      { isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p> }
    </div>
  )
}

export default ConditionalRendering