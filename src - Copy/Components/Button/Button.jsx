import React from 'react'


const Button = ({ answer, dispatch, index, length }) => {

  console.log('Answer in Button component:', answer); // Debug log

  if (index+1 < length) {
    return (
      <div>
        {answer !== null && <button id='nextbtn' onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>}
      </div>
    )
  }

  if (index+1 === length) {
    return (
      <div>
        {answer !== null && <button id='nextbtn' onClick={() => dispatch({ type: "finish" })}>Finish</button>}
      </div>
    )
  }
}

export default Button
