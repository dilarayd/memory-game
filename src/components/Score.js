import React from 'react'
import { useSelector } from 'react-redux'

function Score() {
  const score = useSelector((state) => state.cards.score)
  return (
    <div className='score-container'>
      <div className='score-title'>Your Score</div>
      <div className='score-number'> {score}</div>
   </div>
  )
}
export default Score