import React from 'react'
import { useQuiz } from '../Context/QuizContext'

const Progress = () => {

    const { index, length, totalPoints, points } = useQuiz();
    
    return (
        <div className='progress'>
            <progress value={index} max={length} />

            <div className='result'>
                <p>{index + 1} / {length}</p>
                <p>{points} / {totalPoints}</p>
            </div>
        </div>
    )

}

export default Progress
