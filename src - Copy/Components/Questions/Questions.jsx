import React from 'react';

const Questions = ({ questions, index, dispatch, answer }) => {

    console.log(questions[index].question);
    
    return (
        <div className='ques'>
           
            <p>{questions[index].question}</p>

            <div className="options">

            {questions[index].options.map((option, i) => {
                return (
                 
                    <button
                        key={option}
                        onClick={() => dispatch({ type: 'newAnswer', payload: i })}
                        className={`${answer===null && "answers"} ${answer !== null ? (i === questions[index].correctOption ? "correct" : "wrong") : ""}`}
                        disabled={answer !== null}>

                        {option}

                    </button>
                );
            })}
        </div>
        </div >
    );
};

export default Questions;
