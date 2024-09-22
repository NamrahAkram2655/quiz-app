import React from 'react'
import logo from '../../logo.svg';

const Header = () => {
    return (
        <div>
        
            <div className='logo-head'>

                <img src={logo} alt="" id='logo' />
                <h1 className='heading'>The React Quiz</h1>

            </div>
        
        </div>
    )
}

export default Header
