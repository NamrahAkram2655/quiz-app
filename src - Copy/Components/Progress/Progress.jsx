import React from 'react'

const Progress = ({ index, length, totalPoints, points }) => {

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
