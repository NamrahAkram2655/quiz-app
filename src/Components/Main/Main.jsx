import React from 'react'
import { useQuiz } from '../Context/QuizContext'

const Main = () => {

  const { length, dispatch } = useQuiz();
  
  return (
    <div className='main'>
      <h1>Welcome To The React Quiz</h1>
      <h3>{length} Questions To Check Your React Mastery</h3>
      <button id='btn' onClick={()=>dispatch({ type: "start" })}>Let's Start</button>
    </div>
  )
}

export default Main
