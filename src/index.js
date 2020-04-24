import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';
import BoardWithEffect from './BoardWithEffect';

ReactDOM.render(
  <React.StrictMode>
    <Board />
    {/* <BoardWithEffect /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
