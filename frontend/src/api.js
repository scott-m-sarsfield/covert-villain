import 'isomorphic-fetch';
import Auth from './auth';

const SERVER_API_BASE = process.env.SERVER_API_BASE || '//localhost:3001/api/games';

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
  return fetchJSON(`${SERVER_API_BASE}${url}`);
}

function post(url, data){
  return fetchJSON(`${SERVER_API_BASE}${url}`, {method: 'POST', data});
}

const Api = {
  getGame(code){
    return get(`/${code}`);
  },

  async joinGame(code, name){
    const {game, user, token} = await post(`/join`, {code, name});

    Auth.set(token);

    return {game, user};
  },

  resetGame(code){
    return post(`/${code}/reset`)
  },

  async leaveGame(code){
    await post(`/${code}/leave`);

    Auth.clear();
  }
}

export default Api;
