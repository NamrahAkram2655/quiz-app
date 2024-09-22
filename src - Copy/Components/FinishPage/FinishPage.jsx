import React from 'react'

const FinishPage = ({ points, totalPoints, highscore, dispatch }) => {

    const percentage = (points / totalPoints) * 100;
    let emoji;
    if (percentage === 100) emoji = '🔥';
    if (percentage >= 80 && percentage < 100) emoji = '🎉';
    if (percentage > 40 && percentage < 80) emoji = '😃';
    if (percentage > 0 && percentage <= 40) emoji = '🙃';
    if (percentage === 0) emoji = '🙄';


    return (
        <div className='endPage'>
            
            <p className='finish'>
                {emoji} You score {points} out of {totalPoints}, ({percentage.toFixed(2)}%)
            </p>

            <p className='high'>HighScore : ({highscore} points)</p>

            <button id='Restartbtn' onClick={() => dispatch({ type: "restart" })}>Restart</button>
        </div>

    )
}

export default FinishPage
