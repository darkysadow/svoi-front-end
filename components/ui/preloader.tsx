import React from 'react'

const Preloader = (props: { className?: string}) => {
    return (
        <div className='w-full !absolute !top-1/2 !left-1/2 !-translate-1/2 overflow-hidden'>
            <div className={`triangle-wrap  ${props.className}`}>
                <div className="triangle triangle--main"></div>
                <div className="triangle triangle--red"></div>
                <div className="triangle triangle--blue"></div>
                <div className="triangle__text">Loading</div>
            </div>
        </div>
        
    )
}

export default Preloader