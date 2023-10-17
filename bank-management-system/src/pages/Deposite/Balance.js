import React from 'react'
import { useSelector } from 'react-redux'

const Balance = () => {
    const intBalance=useSelector((state) => state.account.balance)
  return (
    <div>
        <h5>Balance:{intBalance}</h5>
    </div>
  )
}

export default Balance