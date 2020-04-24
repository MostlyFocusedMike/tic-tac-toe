import React, { useState } from 'react';
import './Board.css';

// What's this? When using string comparisons, it's often a good idea to store them in a variable
// to avoid typos and allow your IDE to pick them up for you
// so no 'X' !== 'x' issues if you forget to capitalize
const X = 'X';
const O = 'O';

const Square = ({ idx, squares, setSquares, currentPlayer, setCurrentPlayer, winner }) => {
    const handleClick = () => {
        if (!squares[idx] && !winner) {
            const newSquares = [...squares];
            newSquares[idx] = currentPlayer;
            setSquares(newSquares)
            setCurrentPlayer(currentPlayer === X ? O : X)
        }
    }

    return <button onClick={handleClick}>{squares[idx]}</button>;
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

    const winner = checkForWinner();
    const draw = squares.every(Boolean)

    return (
        <div id="everything">
            <h1>Tic Tac Toe</h1>
            <div id="board">
                <h3>It's {currentPlayer}'s turn!</h3>
                {
                    squares.map((square, idx) => <Square
                        key={idx}
                        idx={idx}
                        squares={squares}
                        setSquares={setSquares}
                        currentPlayer={currentPlayer}
                        setCurrentPlayer={setCurrentPlayer}
                        winner={winner}
                    />)
                }
                { (winner || draw) && <button id="reset" onClick={reset}>Restart!</button> }
            </div>
            <h1>{winner && `${winner} Wins!`}</h1>
        </div>
    );
}

export default Board;
