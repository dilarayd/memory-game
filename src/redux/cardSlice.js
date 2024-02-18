import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import data from '../data/data.json'

export const cardAdaptor = createEntityAdapter();

function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const duplicatedCards = [...data, ...data];

const initialState = cardAdaptor.getInitialState({
    entities: shuffleArray(duplicatedCards),
    matchedPairs: [],
    flippedCards: [],
    score: 0,
    gameOver: false,
});

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        flipCard: (state, action) => {
            const { id } = action.payload;
            if (state.flippedCards.length < 2 && !state.flippedCards.includes(id)) {
                state.flippedCards.push(id);

                if (state.flippedCards.length === 2) {
                    const [firstCardId, secondCardId] = state.flippedCards;
                    const firstCard = state.entities[firstCardId];
                    const secondCard = state.entities[secondCardId];
                    if (firstCard.name === secondCard.name) {
                        state.matchedPairs.push(firstCardId, secondCardId);
                        state.score += 50;
                    } else {
                        state.score -= 10;
                    }
                    state.flippedCards = [];
                    ;
                }
            }
        },
        setGameOver: (state, action) => {
            state.gameOver = action.payload;
        },

        restartGame: (state) => {
            const duplicatedCards = [...data, ...data];
            const shuffledCards = shuffleArray(duplicatedCards);
            return {
                ...state,
                entities: shuffledCards,
                gameOver: false,
                matchedPairs: [],
                flippedCards: [],
                score: 0,
            };
        },
    }
})

export const { flipCard, setGameOver, restartGame } = cardSlice.actions;

export default cardSlice.reducer; 