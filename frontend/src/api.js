import 'isomorphic-fetch';
import Auth from './auth';

Auth.load();

async function fetchJSON(url, {method = 'GET', data} = {}){
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(
        Auth.get() ? {
          'Authorization': `Bearer ${Auth.get()}`
        } : {}
      )
    },
    body: JSON.stringify(data),
  });

  if(response.status === 401) {
    Auth.clear();
  }

  return response.json();
}

function get(url){
  return fetchJSON(url);
}

function post(url, data){
  return fetchJSON(url, {method: 'POST', data});
}

const Api = {
  getGame(code){
    return get(`//localhost:3001/api/games/${code}`);
  },
  async joinGame(code, name){
    const {game, token} = await post(`//localhost:3001/api/games/${code}/join`, {name});

    Auth.set(token);

    return game;
  },
  resetGame(code){
    return post(`//localhost:3001/api/games/${code}/reset`)
  }
}

export default Api;
