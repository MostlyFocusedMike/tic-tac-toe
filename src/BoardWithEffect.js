// LOOK AT THE Board.js FILE FIRST!

import React, { useState, useEffect } from 'react';
import './Board.css';

const X = 'X';
const O = 'O';

const Square = ({ idx, place, handleClick }) => {
    const onClick = () => handleClick(idx);
    return <button onClick={onClick}>{place}</button>;
}

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState(X);
    const [winner, setWinner] = useState(undefined);
    const [isDraw, setIsDraw] = useState(false);

    const checkForWinner = () => {
        const wins = ['012', '345', '678', '036', '147', '258', '048', '246'];

        const doesPieceHaveAFullWinningSet = (pieceType) => {
            return wins.some(winSet => (
                winSet.split('').every(squareIdx => squares[squareIdx] === pieceType)
            ));
        };

        setWinner([X, O].filter(doesPieceHaveAFullWinningSet)[0]);
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

    // Look at this! Now we have useEffect! Now we only run checkForWinner if the squares change,
    // and since squares only change once per turn, we have a hard stop to our renders
    // Remember, you don't want useEffect's callback to return something unless it's a cleanup function
    // that's why there are { } on the second inline function, to block the arrows implicit return
    useEffect(checkForWinner, [squares]);
    useEffect(() => { setIsDraw(squares.every(Boolean)) }, [squares]);

    return (
        <div id="app">
            <h1>Tic Tac Toe</h1>
            <div id="board">
                <h3>It's {currentPlayer}'s turn!</h3>
                {
                    squares.map((square, idx) => <Square
                        key={idx}
                        idx={idx}
                        place={squares[idx]}
                        handleClick={handleClick}
                    />)
                }
                { (winner || isDraw) && <button id="reset" onClick={reset}>Restart!</button> }
            </div>
            <h1>{winner && `${winner} Wins!`}</h1>
        </div>
    );
}

export default Board;
