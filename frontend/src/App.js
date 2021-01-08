import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import React, {useState, useEffect} from 'react';
import Api from './api';
import get from 'lodash/get';
import map from 'lodash/map';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('connected!');
})

const SocketListener = ({event, onEvent}) => {
  useEffect(() => {
    socket.on(event, onEvent);

    return () => {
      socket.off(event, onEvent);
    };
  }, [event, onEvent]);

  return null;
}

function App() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [game, setGame] = useState('');

  const onRefresh = async () => {
    if(code){
      const game = await Api.getGame(code);
      setGame(game);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setCode(value);
  };

  const onChangeName = (e) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setName(value);
  }

  const onClick = async () => {
    const game = await Api.joinGame(code, name);
    socket.emit('join-game', code);
    setGame(game);
  }

  const onReset = async () => {
    const game = await Api.resetGame(code);
    setGame(game);
  }

  return (
    <div className="App">
      <SocketListener event="refresh" onEvent={onRefresh} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>code</span>
        <input type="text" value={code} onChange={onChange}/>
        <br />
        <span>name</span>
        <input type="text" value={name} onChange={onChangeName} />
        <br />
        <button onClick={onClick}>Join</button>
        <button onClick={onReset}>Reset</button>
        <div>
          <span>players</span>
          <ul>
            {map(get(game, 'data.players', []), (player, i) => {
              return (
                <li key={i}>{player}</li>
              )
            })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
