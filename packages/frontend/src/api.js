import 'isomorphic-fetch';
import Auth from './auth';
import { API_URL } from './config';

Auth.load();

async function fetchJSON(url, { method = 'GET', data } = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...Auth.get() ? {
        Authorization: `Bearer ${Auth.get()}`
      } : {}

    },
    body: JSON.stringify(data)
  });

  if (response.status === 401) {
    Auth.clear();
  }

  return response.json();
}

function get(url) {
  return fetchJSON(`${API_URL}${url}`);
}

function post(url, data) {
  return fetchJSON(`${API_URL}${url}`, { method: 'POST', data });
}

const Api = {
  getGame(code) {
    return get(`/${code}`);
  },

  async joinGame(code, name) {
    const { game, user, token } = await post('/join', { code, name });

    Auth.set(token);

    return { game, user };
  },

  resetGame(code) {
    return post(`/${code}/reset`);
  },

  async leaveGame(code) {
    await post(`/${code}/leave`);

    Auth.clear();
  },

  startGame(code) {
    return post(`/${code}/start`);
  },

  chooseChancellor(code, uuid) {
    return post(`/${code}/choose-chancellor`, { uuid });
  },

  vote(code, approved) {
    return post(`/${code}/vote`, { approved });
  },

  discardPolicy(code, card) {
    return post(`/${code}/discard-policy`, { card });
  },

  enactPolicy(code, card) {
    return post(`/${code}/enact-policy`, { card });
  },

  endPolicyPeek(code) {
    return post(`/${code}/end-policy-peek`);
  },

  executePlayer(code, uuid) {
    return post(`/${code}/execute-player`, { uuid });
  }
};

export default Api;
