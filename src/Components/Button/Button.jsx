import React from 'react'
import { useQuiz } from '../Context/QuizContext';


const Button = () => {

  const { answer, dispatch, index, length } = useQuiz();

  console.log('Answer in Button component:', answer); // Debug log

  if (index + 1 < length) {
    return (
      <div>
        {answer !== null && <button id='nextbtn' onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>}
      </div>
    )
  }

  if (index + 1 === length) {
    return (
      <div>
        {answer !== null && <button id='nextbtn' onClick={() => dispatch({ type: "finish" })}>Finish</button>}
      </div>
    )
  }
}

export default Button
