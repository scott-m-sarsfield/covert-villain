import 'isomorphic-fetch';

async function fetchJSON(url, {method = 'GET', data} = {}){
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

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
  joinGame(code, name){
    return post(`//localhost:3001/api/games/${code}/join`, {name})
  },
  resetGame(code){
    return post(`//localhost:3001/api/games/${code}/reset`)
  }
}

export default Api;
