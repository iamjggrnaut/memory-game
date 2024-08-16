import React from 'react'
import '../styles/Card.css'


import back from '../images/card-back.jpg'

const Card = ({ id, image, isFlipped, onClick }) => {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(id)}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={image} alt="card front" className='card-front-img' />
                </div>
                <div className="card-back">
                    <img src={back} alt="card back" className='back-card' />
                </div>
            </div>
        </div>
    );
};

export default Card