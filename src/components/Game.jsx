import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/Game.css';

import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'
import image5 from '../images/image5.jpg'
import image6 from '../images/image6.jpg'

import back from '../images/card-back.jpg'

const cardImages = [
    { id: 1, src: image1 },
    { id: 2, src: image2 },
    { id: 3, src: image3 },
    { id: 4, src: image4 },
    { id: 5, src: image5 },
    { id: 6, src: image6 },
];

const Game = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        // Initialize the deck with pairs of cards
        const shuffledCards = shuffleArray([...cardImages, ...cardImages]);
        setCards(shuffledCards.map((card, index) => ({ ...card, id: index, isFlipped: false })));
    }, []);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleCardClick = (id) => {
        if (flippedCards.length === 2) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            checkForMatch(newFlippedCards);
        }
    };

    const checkForMatch = ([firstCardId, secondCardId]) => {
        setMoves(moves + 1);

        if (cards[firstCardId].src === cards[secondCardId].src) {
            setMatchedCards([...matchedCards, firstCardId, secondCardId]);
            setFlippedCards([]);
        } else {
            setTimeout(() => {
                setCards(
                    cards.map((card) =>
                        card.id === firstCardId || card.id === secondCardId
                            ? { ...card, isFlipped: false }
                            : card
                    )
                );
                setFlippedCards([]);
            }, 1000);
        }
    };

    const handleCardFlip = (id) => {
        setCards(
            cards.map((card) =>
                card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
            )
        );
        handleCardClick(id);
    };

    return (
        <div className="game-container">
            <h1 className='title'>Memory Matching Game</h1>
            <div className="grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        image={card.src}
                        isFlipped={card.isFlipped || matchedCards.includes(card.id)}
                        onClick={handleCardFlip}
                    />
                ))}
            </div>
            <div className="score-board">
                <p>Moves: {moves}</p>
            </div>
        </div>
    );
};

export default Game;
