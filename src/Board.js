import React, { useState } from 'react';
import './Board.css';

// What's this? When using string comparisons, it's often a good idea to store them in a variable
// to avoid typos and allow your IDE to pick them up for you
// so no 'X' !== 'x' issues if you forget to capitalize
const X = 'X';
const O = 'O';

const Square = ({ idx, place, handleClick}) => {
    const onClick = () => handleClick(idx);
    return <button onClick={onClick}>{place}</button>;
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(''))
    const [currentPlayer, setCurrentPlayer] = useState(X);

    const checkForWinner = () => {
        const wins = ['012', '345', '678', '036', '147', '258', '048', '246'];

        const doesPieceHaveAFullWinningSet = (pieceType) => {
            return wins.some(winSet => (
                winSet.split('').every(squareIdx => squares[squareIdx] === pieceType)
            ));
        }

        return [X, O].filter(doesPieceHaveAFullWinningSet)[0];
    }

    const reset = () => setSquares(Array(9).fill(''))

    const handleClick = (idx) => {
        if (!squares[idx] && !winner) {
            const newSquares = [...squares];
            newSquares[idx] = currentPlayer;
            setSquares(newSquares)
            setCurrentPlayer(currentPlayer === X ? O : X)
        }
    }
    // Why aren't these state values? When a value can be derived entirely from other pieces
    // of state, it's sometimes better to calculate it out instead of storing it in state.
    // This avoids endless-render traps when dealing with updating props
    const winner = checkForWinner();
    const draw = squares.every(Boolean)
    // EXPLAIN:
    // if we had [winner, setWinner] when we run setWinner(checkForWinner), it would update state
    // and trigger a rerender of Board...which would then run setWinner again and start all over.
    // that's not good! It may seem odd to have such a "state-y" value not be in state, but it's fine for now.
    // But...You're right to notice this feels off, surely we have a way to stop endless rerenders?
    // We do! It's called useEffect, and to see how it changes things, check out the other Board file
    // by uncommenting it in the index.js file!

    return (
        <div id="app">
            <h1>Tic Tac Toe</h1>
            <div id="board">
                <h3>It's {currentPlayer}'s turn!</h3>
                {
                    squares.map((square, idx) => <Square
                        key={idx}
                        idx={idx}
                        handleClick={handleClick}
                        place={squares[idx]}
                    />)
                }
                { (winner || draw) && <button id="reset" onClick={reset}>Restart!</button> }
            </div>
            <h1>{winner && `${winner} Wins!`}</h1>
        </div>
    );
}

export default Board;

// squares={squares}
// setSquares={setSquares}
// currentPlayer={currentPlayer}
// setCurrentPlayer={setCurrentPlayer}
// winner={winner}